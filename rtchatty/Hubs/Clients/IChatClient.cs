using System.Collections.Generic;
using System.Threading.Tasks;
using rtchatty.Models;

namespace rtchatty.Hubs.Clients
{
	public interface IChatClient
	{
		Task ReceiveMessage(ChatMessage message);
		Task SendPrivateMessage(string user, ChatMessage message);
		Task PopulateMessages(List<object> messageList);
		Task EditMessage(ChatMessage oldMsg, ChatMessage newMsg);
	}
}