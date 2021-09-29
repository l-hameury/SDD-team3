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
        [Route("getUsers")]
        public ActionResult<List<User>> GetUsers()
        {
            return service.GetUsers();
        }


        [Route("searchUsers")]
        [HttpPost]
        public ActionResult<List<User>> searchUsers([FromBody] string query)
        {
            return service.searchUsers(query);
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<User> GetUser(string id)
        {
            var user = service.GetUser(id);

            return Json(user);
        }

        [Route("createUser")]
        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            service.Create(user);

            return Json(user);
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