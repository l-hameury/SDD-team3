using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace rtchatty.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }
        [BsonElement("Password")]
        public string Password { get; set; }
        [BsonElement("Avatar")]
        public string Avatar { get; set; }
        [BsonElement("Bio")]
        public string Bio { get; set; }
        [BsonElement("Username")]
        public string Username { get; set; }
        [BsonElement("CanSearch")]
        public bool CanSearch { get; set; }
        [BsonElement("StatusShow")]
        public bool StatusShow { get; set; }
        [BsonElement("CanMessage")]
        public bool CanMessage { get; set; }
        [BsonElement("Status")]
        public string Status { get; set; }
        [BsonElement("Banned")]
        public bool Banned { get; set; }
        [BsonElement("IsAdmin")]
        public bool IsAdmin { get; set; }
        [BsonElement("ConnectionID")]
        public string ConnectionID { get; set; }
		[BsonElement("FriendList")]
		public List<string> FriendList { get; set; } = new List<string>();
		[BsonElement("IncomingFriendRequests")]
		public List<string> IncomingFriendRequests { get; set; } = new List<string>();
		[BsonElement("OutgoingFriendRequests")]
		public List<string> OutgoingFriendRequests { get; set; }  = new List<string>();
		[BsonElement("isOnline")]
		public bool isOnline { get; set; }

        [BsonElement("NotificationCount")]
        public int NotificationCount {get; set;} = 0;
        [BsonElement("Channels")]
        public List<string> Channels { get; set; } = new List<string>();
    }
}