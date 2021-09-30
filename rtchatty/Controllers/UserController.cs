using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
			//username validation
			if(service.ValidateUsername(user.username)){
				service.CreateUser(user);

				return Json(user);
			}
			else{
				//insert error message here
			}
		}

		[AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            var token = service.Authenticate(user.Email, user.Password);

            if (token == null)
                return Unauthorized();

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