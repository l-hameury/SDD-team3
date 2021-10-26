using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
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
    public class AdminService
    {
        private readonly IMongoCollection<User> _users;
        private readonly string key;

        public AdminService(IConfiguration configuration)
        {
            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("chattyDB");

            _users = database.GetCollection<User>("users");

            this.key = configuration.GetSection("JwtKey").ToString();

        }

        public bool IsAdmin(string email)
        {
            var user = GetUserByEmail(email);
            return user != null ? user.IsAdmin : false;
        }
        public User GetUserByEmail(string email) => _users.Find<User>(user => user.Email == email).FirstOrDefault();

        public bool DeleteUser(string email)
        {
            if (email != "")
            {
                var user = _users.FindOneAndDelete<User>(user => user.Email.ToLower().Contains(email.ToLower()));
                if (user != null)
                {
                    return true;
                }
            }
            return false;

        }

        public User BanUser(string email)
        {
            if (email != "")
            {
                var user = _users.Find<User>(user => user.Email.ToLower().Contains(email.ToLower())).FirstOrDefault();
                if (user != null)
                {
                    user.Banned = !user.Banned;
                    _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(email.ToLower()), user);
                    return user;
                }
            }
            return null;

        }

        public User SetAdminStatus(string email)
        {
            if (email != "")
            {
                var user = _users.Find<User>(user => user.Email.ToLower().Contains(email.ToLower())).FirstOrDefault();
                if (user != null)
                {
                    user.IsAdmin = !user.IsAdmin;
                    _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(email.ToLower()), user);
                    return user;
                }
            }
            return null;

        }
    }
}