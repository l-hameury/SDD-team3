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
		Task LikeOrDislikeMessage(ChatMessage oldMsg, ChatMessage newMsg);
		Task ChangeChannels(List<object> messageList);
		Task DeleteMessage(ChatMessage message);
	}
}