using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Net.Mail;
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

        private readonly UserService _userService;
        private readonly ChatService _chatService;
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, ChatService chatService, UserService userService)
        {
            _chatService = chatService;
            _chatHub = chatHub;
            _userService = userService;
        }

        [HttpPost("messages")]
        public async Task SendMessage(ChatMessage message, string chatRoomName, string username = "", string recipient = "")
        {
            _chatService.StoreMessage(message);

            // if email was passed, get the corresponding User and connection ID. 
            // Then call Receive Message only on that connection.
            if(message.recipient != "")
            {
                User user = _userService.GetUserByUsername(message.recipient);
                await _chatHub.Clients.Client(user.ConnectionID).ReceiveMessage(message);
            }
            else {
                // chatHub.Clients.All sends to all chathub clients. This sends messages back to the front end
                // And makes a call to the `ReceiveMessage()` function therein.
                await _chatHub.Clients.All.ReceiveMessage(message);
            }

        }

        [Route("getAll")]
        [HttpGet]
        public async Task GetMessages(string channel = "")
        {
            List<object> messageList = _chatService.GetMessages(channel);
            await _chatHub.Clients.All.PopulateMessages(messageList);
            // await _chatHub.GetMessages();
        }

        [Route("editMessage")]
        [HttpPost]
        public async Task EditMessage(ChatMessage message)
        {
            var msg = _chatService.EditMessage(message);
            await _chatHub.Clients.All.EditMessage(msg, message);
        }
    }
}