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

        public bool IsAdmin(string email)
        {
            var user = GetUserByEmail(email);
            return user.IsAdmin;
        }

        public List<User> GetUsers() =>
            _users.Find(user => true).ToList();

        public User GetUser(string id) => _users.Find<User>(user => user.Id == id).FirstOrDefault();
        public User GetUserByEmail(string email) => _users.Find<User>(user => user.Email == email).FirstOrDefault();
        public User GetPublicUserInfo(string username) => _users.Find<User>(user => user.Username == username).FirstOrDefault();

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
            var user = _users.Find(user => user.Email == email && user.Password == password).FirstOrDefault();

            // TODO: Return Not Found error. (Not a 404. User not found error.)
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

                Expires = DateTime.UtcNow.AddHours(3),

                SigningCredentials = new SigningCredentials
                (
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }

        public User ProfileUpdate(User user)
        {
            // prepare document filter by ID for update operation
            var filter = Builders<User>.Filter.Eq(p => p.Id, user.Id);

            // grabbing current user username in mongodb
            var usernameProjection = Builders<User>.Projection.Include("Username");
            var mongoUsername = _users.Find<User>(filter).Project(usernameProjection).First()["Username"].ToString();

            // grabbing current user email in mongodb
            var emailProjection = Builders<User>.Projection.Include("Email");
            var mongoEmail = _users.Find<User>(filter).Project(emailProjection).First()["Email"].ToString();

            // grabbing current user password in mongodb
            var passwordProjection = Builders<User>.Projection.Include("Password");
            var mongoPassword = _users.Find<User>(filter).Project(passwordProjection).First()["Password"].ToString();

            // preparing properties to be updated
            var update = Builders<User>.Update
            .Set(p => p.Bio, user.Bio)
            .Set(p => p.Avatar, user.Avatar);

            // update canSearch, statusShow and canMessage
            update = update.Set(p => p.CanSearch, user.CanSearch);
            update = update.Set(p => p.StatusShow, user.StatusShow);
            update = update.Set(p => p.CanMessage, user.CanMessage);
            update = update.Set(p => p.Status, user.Status);

            // if there is a username to be updated, add it to the update operation that I defined above
            if (user.Username != mongoUsername && user.Email != null) update = update.Set(p => p.Username, user.Username);

            // if there is an email to be updated, add it to the update operation that I defined above
            if (user.Email != mongoEmail && user.Email != null) update = update.Set(p => p.Email, user.Email);

            // if there is a password to be updated, add it to the update operation that I defined above
            if (user.Password != mongoPassword && user.Password != null) update = update.Set(p => p.Password, user.Password);

            // invoke update operation
            _users.UpdateOne(filter, update);
            return user;
        }

        public User setOnline(string email){
            
            var user = _users.Find<User>(user => user.Email.ToLower().Contains(email.ToLower())).FirstOrDefault();
            if(!user.isOnline)
            {
                user.isOnline= true;
                _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(email.ToLower()), user);
            }
            return user;
        }
        
        public User setOffline(string email){
            
            var user = _users.Find<User>(user => user.Email.ToLower().Contains(email.ToLower())).FirstOrDefault();
            if(user.isOnline)
            {
                user.isOnline= false;
                _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(email.ToLower()), user);
            }
            return user;
        }
        public User sendFriendRequest(User user)
        {
            string senderEmail = user.Email;
            string recipientEmail = user.OutgoingFriendRequests[0];

            var sender =  _users.Find<User>( user => user.Email.ToLower().Contains(senderEmail.ToLower())).FirstOrDefault();
            var recipient =  _users.Find<User>( user => user.Email.ToLower().Contains(recipientEmail.ToLower())).FirstOrDefault();

            //Add sender to receiver's list of incoming requests, if absent.
            if( !sender.OutgoingFriendRequests.Contains(recipientEmail)){
                sender.OutgoingFriendRequests.Add(recipientEmail.ToLower());
            }
            //Add recipient to sender's list of outgoing requests.
            if(!recipient.IncomingFriendRequests.Contains(senderEmail)){
                recipient.IncomingFriendRequests.Add(senderEmail.ToLower());
            }

            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(senderEmail.ToLower()), sender);
            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(recipientEmail.ToLower()), recipient);

            return user;
        }

        public User confirmFriendRequest(User user)
        {
            string currentEmail = user.Email;
            string requestingEmail = user.IncomingFriendRequests[0];

            var currentUser =  _users.Find<User>( user => user.Email.ToLower().Contains(currentEmail.ToLower())).FirstOrDefault();
            var requestingUser =  _users.Find<User>( user => user.Email.ToLower().Contains(requestingEmail.ToLower())).FirstOrDefault();

            //Add requestingUser to currentUser's friendlist and then
            //Remove requestingUser from currentUser's incomingFriendList
            if(currentUser.IncomingFriendRequests.Contains(requestingEmail)){
                currentUser.FriendList.Add(requestingEmail);
                currentUser.IncomingFriendRequests.Remove(requestingEmail);
            }

            //Add currentUser to requestingUser's friendlist and then
            //remove currentUser from requestingUser's outgoinglist.
            if(requestingUser.OutgoingFriendRequests.Contains(currentEmail)){
                requestingUser.FriendList.Add(currentEmail);
                requestingUser.OutgoingFriendRequests.Remove(currentEmail);
            }

            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(currentEmail.ToLower()), currentUser);
            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(requestingEmail.ToLower()), requestingUser);

            return currentUser;
        }

        public User deleteFriendRequest(User user)
        {
            string currentEmail = user.Email;
            string requestingEmail = user.IncomingFriendRequests[0];

            var currentUser =  _users.Find<User>( user => user.Email.ToLower().Contains(currentEmail.ToLower())).FirstOrDefault();
            var requestingUser =  _users.Find<User>( user => user.Email.ToLower().Contains(requestingEmail.ToLower())).FirstOrDefault();
            
            //Remove requestingUser from currentUser's outgoingFriendList
            if(currentUser.OutgoingFriendRequests.Contains(requestingEmail)){
                currentUser.OutgoingFriendRequests.Remove(requestingEmail);
            }
            
            //remove currentUser from requestingUser's incominglist.
            if(requestingUser.IncomingFriendRequests.Contains(currentEmail)){
                requestingUser.IncomingFriendRequests.Remove(currentEmail);
            }

            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(currentEmail.ToLower()), currentUser);
            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(requestingEmail.ToLower()), requestingUser);

            return currentUser;
        }

        public User ignoreRequest(User user){
             string currentEmail = user.Email;
            string requestingEmail = user.IncomingFriendRequests[0];

            var currentUser =  _users.Find<User>( user => user.Email.ToLower().Contains(currentEmail.ToLower())).FirstOrDefault();
            var requestingUser =  _users.Find<User>( user => user.Email.ToLower().Contains(requestingEmail.ToLower())).FirstOrDefault();

            //Remove requestingUser from currentUser's incomingFriendList
            if(currentUser.IncomingFriendRequests.Contains(requestingEmail)){
                currentUser.IncomingFriendRequests.Remove(requestingEmail);
            }

            //remove currentUser from requestingUser's outgoinglist.
            if(requestingUser.OutgoingFriendRequests.Contains(currentEmail)){
                requestingUser.OutgoingFriendRequests.Remove(currentEmail);
            }
            
            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(currentEmail.ToLower()), currentUser);
            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(requestingEmail.ToLower()), requestingUser);

            return currentUser;
        }

        public User unfriend(User user)
        {
            string currentEmail = user.Email;
            string friendEmail = user.FriendList[0];

            var currentUser =  _users.Find<User>( user => user.Email.ToLower().Contains(currentEmail.ToLower())).FirstOrDefault();
            var friendUser =  _users.Find<User>( user => user.Email.ToLower().Contains(friendEmail.ToLower())).FirstOrDefault();

            //Remove friendUser from currentUser's friendlist
            if(currentUser.FriendList.Contains(friendEmail)){
                currentUser.FriendList.Remove(friendEmail);
            }

            //remove currentUser from friendUser's friendlist
            if(friendUser.FriendList.Contains(currentEmail)){
                friendUser.FriendList.Remove(currentEmail);
            }

            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(currentEmail.ToLower()), currentUser);
            _users.ReplaceOne<User>(user => user.Email.ToLower().Contains(friendEmail.ToLower()), friendUser);

            return currentUser;

        }
    }
}