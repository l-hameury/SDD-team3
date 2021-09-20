using System.Threading.Tasks;
using rtchatty.Models;

namespace rtchatty.Hubs.Clients
{
	public interface IChatClient
	{
		Task ReceiveMessage(ChatMessage message);
	}
}