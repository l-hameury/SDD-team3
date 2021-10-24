
using System.Net.WebSockets;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using rtchatty.Hubs.Clients;
using rtchatty.Models;
using rtchatty.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace rtchatty.Hubs
{
	// The functionality for this Chat Hub has been moved to the ChatController.cs file
	// To allow for HTTP requests and to provide an API endpoint
	public class ChatHub : Hub<IChatClient>
	{
		public ChatHub(ChatService _service)
        { }
	}
		//TODO: Move this logic to the ChatController
		// public async Task SaveMessage(ChatMessage message)


		// public ActionResult<List<ChatMessage>> GetMessages(ChatMessage message){
		// 	// string group = message.Group;
		// 	// string user = message.user;
		// 	return service.GetMessages();
		// }


		// public string GetMessages(ChatMessage message){
		// 	// string group = message.Group;
		// 	// string user = message.user;
		// 	// return service.GetMessages();
		// 	Console.WriteLine("GetMessages function hit! \n");
		// 	return service.GetMessages();
		// }
}