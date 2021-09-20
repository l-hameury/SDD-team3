using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace rtchatty.Models
{
	public class User
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		[BsonElement("UserName")]
		public string userName { get; set; }

		public string firstName { get; set; }
		public string lastName { get; set; }
	}
}