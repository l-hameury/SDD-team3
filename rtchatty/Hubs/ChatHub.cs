
using System.Net.WebSockets;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using rtchatty.Hubs.Clients;
using rtchatty.Models;
using rtchatty.Services;

namespace rtchatty.Hubs
{
	public class ChatHub : Hub<IChatClient>
	{
		private readonly MessageService service;

		public ChatHub(MessageService _service)
        {
            service = _service;
        }
		public async Task SaveMessage(ChatMessage message)
		{
			service.StoreMessage(message);
			await SendMessage(message);
		}
		public async Task SendMessage(ChatMessage message)
		{
			await Clients.All.ReceiveMessage(message);
		}
	}
}