using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rtchatty.Models;
using rtchatty.Services;


namespace rtchatty.Controllers
{
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

		[Route("update")]
		[HttpPost]
		public ActionResult<User> Update(User user)
        {
			service.Update(user);
			return Json(user);
        }

		[HttpPost]
		public ActionResult<User> Create(User user)
		{
			service.Create(user);

			return Json(user);
		}
	}
}