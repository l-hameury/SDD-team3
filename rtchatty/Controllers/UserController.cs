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
        [Route("api/[controller]/getUsers")]
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

        [HttpPost]
        [Route("api/[controller]/createUser")]
        public ActionResult<User> Create(User user)
        {
            service.Create(user);

            return Json(user);
        }
    }
}