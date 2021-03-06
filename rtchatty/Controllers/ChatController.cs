using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
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
            ClaimsIdentity identity = User.Identity as ClaimsIdentity;
            IEnumerable<Claim> claims = identity.Claims;
            var email = claims.FirstOrDefault().Value;
            User sender = _userService.GetUserByEmail(email);
            message.Avatar = sender.Avatar;
            _chatService.StoreMessage(message);

            Console.WriteLine("Recipient pre if is: ", message.recipient);
            Console.WriteLine("Chat Room name is : ", chatRoomName);
            Console.WriteLine("Or maybe group name is : ", message.Channel);

            // TODO: Uncomment this line to send a private message to the user with this specific email.
            // email = "kris@test.com";

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
                Console.WriteLine("message is: ", message.Message);
                Console.WriteLine("message channel is: ", message.Channel);
                await _chatHub.Clients.All.ReceiveMessage(message);
            }

        }

        [Route("getAll")]
        [HttpGet]
        public async Task GetMessages(string channel = "", string connectionId = "")
        {
            List<object> messageList = _chatService.GetMessages(channel);
            if(connectionId != ""){
                await _chatHub.Clients.Client(connectionId).ChangeChannels(messageList);
            } else{
                await _chatHub.Clients.All.PopulateMessages(messageList);
            }
            // await _chatHub.GetMessages();
        }

        [Route("editMessage")]
        [HttpPost]
        public async Task EditMessage(ChatMessage message)
        {
            var msg = _chatService.EditMessage(message);
            await _chatHub.Clients.All.EditMessage(msg, message);
        }

        [Route("likeMessage")]
        [HttpPost]
        public async Task<ChatMessage> LikeMessage(ChatMessage message)
        {
            ClaimsIdentity identity = User.Identity as ClaimsIdentity;
            IEnumerable<Claim> claims = identity.Claims;
            var email = claims.FirstOrDefault().Value;
            var msg = _chatService.LikeMessage(message, email);
            await _chatHub.Clients.All.LikeOrDislikeMessage(msg, message);
            return msg;
        }

        [Route("dislikeMessage")]
        [HttpPost]
        public async Task<ChatMessage> DislikeMessage(ChatMessage message)
        {
            ClaimsIdentity identity = User.Identity as ClaimsIdentity;
            IEnumerable<Claim> claims = identity.Claims;
            var email = claims.FirstOrDefault().Value;
            var msg = _chatService.DislikeMessage(message, email);
            await _chatHub.Clients.All.LikeOrDislikeMessage(msg, message);
            return msg;
        }
         [Route("deleteMessage")]
        [HttpDelete]
        public async Task DeleteMessage(ChatMessage message)
        {
            var msg = _chatService.DeleteMessage(message);
            await _chatHub.Clients.All.DeleteMessage(msg);
        }

        // TODO: Implement users and Groups for sending DMs
		// Source for this sample: 
		// https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/signalr/groups/sample/Hubs/ChatHub.cs
		// public Task SendPrivateMessage(string user, string message)
		// {
		// 	return chatHub.Clients.User(user).SendPrivateMessage("ReceiveMessage", message);
		// }
    }
}