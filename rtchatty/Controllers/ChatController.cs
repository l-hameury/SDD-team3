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
        public async Task Post(ChatMessage message)
        {
            service.StoreMessage(message);

            // chatHub.Clients sends to all chathub clients. This sends back to the front end
            await chatHub.Clients.All.ReceiveMessage(message);
        }
    }
}