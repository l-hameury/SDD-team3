using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Core.Authentication;
using rtchatty.Models;
using rtchatty.Services;


namespace rtchatty.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : Controller
	{
		private readonly UserService service;

		public UserController(UserService _service)
		{
			service = _service;
		}

		[HttpGet]
		public ActionResult<List<User>> GetUsers()
		{
			return service.GetUsers();
		}

		[HttpGet("{id:length(24)}")]
		public ActionResult<User> GetUser(string id)
		{
			var user = service.GetUser(id);

			return Json(user);
		}

		[AllowAnonymous]
		[Route("register")]
		[HttpPost]
		public ActionResult<User> CreateUser(User user)
		{
			string invalidItem = "";

			if(!service.ValidateUsername(user.Username)) invalidItem += nameof(user.Username);
			if(!service.ValidateEmail(user.Email)) invalidItem += nameof(user.Email);

			// User is correctly created - return 201; If User is already created - return 409
			if(String.IsNullOrEmpty(invalidItem)) {
				service.CreateUser(user);
				return CreatedAtAction("CreateUser", user);
			}
			
			return Conflict(invalidItem);
		}

		[AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            var token = service.Authenticate(user.Email, user.Password);

            if (token == null) return Unauthorized(); 

            return Ok(new { token, user });
        }

		[Route("update")]
		[HttpPost]
		public ActionResult<User> Update(User user)
        {
			service.Update(user);
			return Json(user);
        }
	}
}