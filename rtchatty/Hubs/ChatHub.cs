
using System.Net.WebSockets;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using rtchatty.Hubs.Clients;
using rtchatty.Models;

namespace rtchatty.Hubs
{
	public class ChatHub : Hub<IChatClient>
	{
		public async Task SendMessage(ChatMessage message)
		{
			await Clients.All.ReceiveMessage(message);
		}
	}
}