using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using rtchatty.Models;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;

namespace rtchatty.Services
{
    public class ChannelService
    {
        private readonly IMongoCollection<Channel> _channels;

        private readonly string key;

        public ChannelService(IConfiguration configuration) 
        {
            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("chattyDB");

            _channels = database.GetCollection<Channel>("channels");

            this.key = configuration.GetSection("JwtKey").ToString();
        }

        public List<Channel> GetChannels() => _channels.Find(channel => true).ToList();

        public Channel CreateChannel(Channel channel)
        {
            _channels.InsertOne(channel);

            return channel;
        }

        public bool ValidateChannelName(string name)
        {
            if (_channels.Find<Channel>(channel => channel.Name == name).FirstOrDefault() != null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}