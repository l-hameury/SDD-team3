using System.Reflection;
using System.Threading;
using System.Globalization;
using System.ComponentModel;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using rtchatty.Database;
using rtchatty.Models;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System;


namespace rtchatty.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly string key;

        public UserService(IConfiguration configuration)
        {
            // var client = new MongoClient(settings.ConnectionString);

            // var database = client.GetDatabase(settings.DatabaseName);

            // _users = database.GetCollection<User>(settings.UsersCollectionName);
            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("chattyDB");

            _users = database.GetCollection<User>("users");

            this.key = configuration.GetSection("JwtKey").ToString();

        }

        public List<User> GetUsers() =>
            _users.Find(user => true).ToList();

        public User GetUser(string id) => _users.Find<User>(user => user.Id == id).FirstOrDefault();

        public List<User> searchUsers(string query)
        {
            if (query != "")
            {
                return _users.Find<User>(user => user.Email.ToLower().Contains(query.ToLower())).ToList();
            }
            else
            {
                return GetUsers();
            }
        }
        // _users.InsertOne(user);


        // Register new user
        public User CreateUser(User user)
        {
            _users.InsertOne(user);

            return user;
        }

        // Validate username is unique across all users
        public bool ValidateUsername(string username)
        {
            if (_users.Find<User>(user => user.Username == username).FirstOrDefault() != null)
            {
                return false;
            }

            return true;
        }


        public bool ValidateEmail(string email)
        {
            if (_users.Find<User>(user => user.Email == email).FirstOrDefault() != null)
            {
                return false;
            }

            return true;
        }


        public string Authenticate(string email, string password)
        {
            var user = this._users.Find(x => x.Email == email && x.Password == password).FirstOrDefault();

            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenKey = Encoding.ASCII.GetBytes(key);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, email),
                }),

                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials
                (
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public User Update(User user)
        {
            var filter = Builders<User>.Filter.Eq(p => p.Id, user.Id);
            var update = Builders<User>.Update
            .Set(p => p.Bio, user.Bio)
            .Set(p => p.Avatar, user.Avatar);

            _users.UpdateOne(filter, update);
            return user;
        }
    }
}