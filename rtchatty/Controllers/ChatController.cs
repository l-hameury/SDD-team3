using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using rtchatty.Hubs;
using rtchatty.Hubs.Clients;
using rtchatty.Models;
using rtchatty.Services;

namespace rtchatty.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {

        private readonly ChatService service;

        private readonly IHubContext<ChatHub, IChatClient> chatHub;

        public ChatController(IHubContext<ChatHub, IChatClient> _chatHub, ChatService _service)
        {
            service = _service;
            chatHub = _chatHub;
        }

        [HttpPost("messages")]
        public async Task SendMessage(ChatMessage message)
        {
            service.StoreMessage(message);

            Console.WriteLine(message);

            // chatHub.Clients sends to all chathub clients. This sends back to the front end
            await chatHub.Clients.All.ReceiveMessage(message);
        }

        // TODO: Add `group` property to allow sending to specific groups/chats
        [HttpGet("getAll")]
        public async Task GetMessages()
        {
            List<ChatMessage> messageList = service.GetMessages();

            await chatHub.Clients.All.PopulateMessages(messageList);
        }

        // TODO: Implement users and Groups for sending DMs
		// Source for this sample: 
		// https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/signalr/groups/sample/Hubs/ChatHub.cs
		public Task SendPrivateMessage(string user, string message)
		{
			return chatHub.Clients.User(user).SendPrivateMessage("ReceiveMessage", message);
		}
    }
}