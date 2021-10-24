using System.Collections.Generic;
using System.Threading.Tasks;
using rtchatty.Models;

namespace rtchatty.Hubs.Clients
{
	public interface IChatClient
	{
		Task ReceiveMessage(ChatMessage message);
		Task PopulateMessages(List<ChatMessage> messageList);
		Task SendPrivateMessage(string user, string message);
	}
}