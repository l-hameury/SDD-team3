
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
	public class ChatHub : Hub<IChatClient>
	{
		public ChatHub(ChatService _service)
        { }
	}
		//TODO: Move this logic to the ChatController
		// public async Task SaveMessage(ChatMessage message)
		// {
		// 	service.StoreMessage(message);
		// 	await SendMessage(message);
		// }
		// public async Task SendMessage(ChatMessage message)
		// {
		// 	await Clients.All.ReceiveMessage(message);
		// }

		// // public ActionResult<List<ChatMessage>> GetMessages(ChatMessage message){
		// // 	// string group = message.Group;
		// // 	// string user = message.user;
		// // 	return service.GetMessages();
		// // }


		// public string GetMessages(ChatMessage message){
		// 	// string group = message.Group;
		// 	// string user = message.user;
		// 	// return service.GetMessages();
		// 	Console.WriteLine("GetMessages function hit! \n");
		// 	return service.GetMessages();
		// }


		// TODO: Implement users and Groups for sending DMs
		// Source for this sample: 
		// https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/signalr/groups/sample/Hubs/ChatHub.cs
		// public Task SendPrivateMessage(string user, string message)
		// {
		// 	return Clients.User(user).SendAsync("ReceiveMessage", message);
		// }
}