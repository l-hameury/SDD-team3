using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

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
	}
}