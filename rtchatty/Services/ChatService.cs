using System.Linq;
using System.Collections.Generic;
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
		// private readonly string key;

		public ChatService(IConfiguration configuration)
		{
			var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("chattyDB");

            _messages = database.GetCollection<ChatMessage>("chat_messages");

			_users = database.GetCollection<User>("users");
		}
		
		public List<object> GetMessages(string channel = "")
		{ 	

			var messages = _messages.Find(channel => true).ToList();
			var users = _users.Find(user => true).ToList();	

			// Map the user info to the messages
			var query = from user in _users.AsQueryable().AsEnumerable()
						join message in _messages.AsQueryable().Where(message => message.Channel == channel).AsEnumerable()
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

		public ChatMessage EditMessage(ChatMessage message)
		{
			// okay ideally I would've filtered by the Message ID, but I couldn't figure out how to get the ID.
			// so I filtered by what I think is the next best thing which is matching by Username && Timestamp ._.
			var filter = Builders<ChatMessage>.Filter.Eq(db => db.User, message.User) & Builders<ChatMessage>.Filter.Eq(db => db.Timestamp, message.Timestamp);
			var msg = _messages.Find(filter).FirstOrDefault();
			var update = Builders<ChatMessage>.Update.Set(db => db.Message, message.Message);
			_messages.UpdateOne(filter,update);

			return msg;
		}
	}
}