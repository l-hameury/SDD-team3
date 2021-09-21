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

		// [BsonElement("FirstName")]
		// public string firstName { get; set; }
		// [BsonElement("LastName")]
		// public string lastName { get; set; }
	}
}