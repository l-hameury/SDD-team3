using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace rtchatty.Models
{
    public class AdminRequest
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("AdminEmail")]
        public string AdminEmail { get; set; }
        [BsonElement("UserEmail")]
        public string UserEmail { get; set; }
    }
}