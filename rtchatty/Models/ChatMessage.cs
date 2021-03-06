using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace rtchatty.Models
{
	public class ChatMessage
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		[BsonElement("Channel")]
		public string Channel { get; set; }
		[BsonElement("User")]
		public string User { get; set; }
		//TODO: Probably delete this 
		[BsonElement("Recipient")]
		public string recipient { get; set; }
		[BsonElement("Message")]
		public string Message { get; set; }
		public DateTime Timestamp { get; set; }
		[BsonElement("Likes")]
		public List<string> Likes { get; set; } = new List<string>();
		[BsonElement("Dislikes")]
		public List<string> Dislikes { get; set; } = new List<string>();
		[BsonElement("Avatar")]
		public string Avatar { get; set; }
	}
}