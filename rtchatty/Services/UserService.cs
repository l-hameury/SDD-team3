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
			_users.InsertOne(user);

			return user;
		}
	}
}