using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using rtchatty.Models;

namespace rtchatty.Services
{
	public class ChatService
	{
		private readonly IMongoCollection<ChatMessage> _messages;

		public ChatService(IConfiguration configuration)
		{
			var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("chattyDB");

            _messages = database.GetCollection<ChatMessage>("chat_messages");
		}
		
		// TODO: Maybe add a users field here to Get Messages for a specific user
		public List<ChatMessage> GetMessages()
		{
			return _messages.Find(group => true).ToList();
		}

		public bool StoreMessage(ChatMessage message)
		{
			_messages.InsertOne(message);

			return true;
		}
	}
}