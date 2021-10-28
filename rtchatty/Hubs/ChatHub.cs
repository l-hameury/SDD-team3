
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using rtchatty.Hubs.Clients;
using rtchatty.Services;

namespace rtchatty.Hubs
{
	// The functionality for this Chat Hub has been moved to the ChatController.cs file
	// To allow for HTTP requests and to provide an API endpoint
	public class ChatHub : Hub<IChatClient>
	{
		private readonly UserService _userService;
		private readonly ChatService _service;
		public ChatHub(ChatService service, UserService userService)
		{
			_service = service;
			_userService = userService;
		}

		// Overriding On Connected Task to maybe add connectionIDs to groups or... something.
		// Not sure what to do here just yet.
		public override Task OnConnectedAsync()
		{
			return base.OnConnectedAsync();
		}

		// Overriding disconnected task to possibly update the DB. 
		// Not necessary right now though.
		public override Task OnDisconnectedAsync(Exception exception)
		{
			return base.OnDisconnectedAsync(exception);
		}
	}

}