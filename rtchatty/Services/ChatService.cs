using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using rtchatty.Models;
using System;

namespace rtchatty.Services
{
	public class ChatService
	{
		private readonly IMongoCollection<ChatMessage> _messages;
		private readonly IMongoCollection<User> _users;
		private readonly string key;

		public ChatService(IConfiguration configuration)
		{
			var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("chattyDB");

            _messages = database.GetCollection<ChatMessage>("chat_messages");

			_users = database.GetCollection<User>("users");
		}
		
		public List<object> GetMessages() 
		{ 	
			var messages = _messages.Find(group => true).ToList();
			var users = _users.Find(user => true).ToList();	

			// Map the user info to the messages
			var query = from user in _users.AsQueryable().AsEnumerable()
						join message in _messages.AsQueryable().AsEnumerable()
						on user.Username equals message.User
						orderby message.Timestamp
						select new { message, user };
			
			return query.ToList<object>();
		}

		public bool StoreMessage(ChatMessage message)
		{
			message.Timestamp = DateTime.Now;
			_messages.InsertOne(message);

			return true;
		}
	}
}