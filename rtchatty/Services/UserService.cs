using System.ComponentModel;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using rtchatty.Database;
using rtchatty.Models;
using System.Linq;
using System.Collections.Generic;

namespace rtchatty.Services
{
	public class UserService
	{
		private readonly IMongoCollection<User> _users;

		public UserService(IChattyDatabaseSettings settings)
		{
			// var client = new MongoClient(settings.ConnectionString);

			// var database = client.GetDatabase(settings.DatabaseName);

			// _users = database.GetCollection<User>(settings.UsersCollectionName);
			var client = new MongoClient("mongodb://localhost:27017");

			var database = client.GetDatabase("chattyDB");

			_users = database.GetCollection<User>("users");
		}

		public List<User> GetUsers() =>
			_users.Find(user => true).ToList();

		public User GetUser(string id) => _users.Find<User>(user => user.Id == id).FirstOrDefault();

		public User Create(User user)
		{
			/* //to fix "string not valid 24 hex" i had issues with this api when not running locally
			User newUser = new User()
			{
				Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString(),
				Email = user.Email,
				Password = user.Password
			};
			user.Id = newUser.Id;
			*/
			_users.InsertOne(user);
			return user;
		}

		public User Update(User user)
        {
			var filter = Builders<User>.Filter.Eq("id", user.Id);
			var updatedUser = new User()
			{
				Id = user.Id,
				Email = user.Email,
				Password = user.Password,
				Avatar = user.Avatar
            };
			_users.FindOneAndReplace(filter, updatedUser);
			return user;
        }
	}
}