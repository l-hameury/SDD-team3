using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using rtchatty.Models;

namespace rtchatty.Services
{
	public class ChatService
	{
		private readonly IMongoCollection<ChatMessage> _messages;
		private readonly string key;

		public ChatService(IConfiguration configuration)
		{
			var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("chattyDB");

            _messages = database.GetCollection<ChatMessage>("chat_messages");
		}
		
		// public List<ChatMessage> GetMessages() => 
		// 	_messages.Find(group => true).ToList();

		public List<ChatMessage> GetMessages()
		{
			// Console.WriteLine(Clients.User(user))
			return _messages.Find(group => true).ToList();
		}

		public bool StoreMessage(ChatMessage message)
		{
			// Hubs.Clients.

			_messages.InsertOne(message);

			return true;
		}
	}
}