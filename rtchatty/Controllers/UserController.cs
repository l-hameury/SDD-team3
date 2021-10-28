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
        [Route("getUsers")]
        public ActionResult<List<User>> GetUsers()
        {
            return service.GetUsers();
        }

        [HttpGet]
        [Route("getUserByEmail")]
        public ActionResult<User> GetUserByEmail(string email)
        {
            return service.GetUserByEmail(email);
        }

        [HttpGet]
        [Route("getUserInfo")]
        public ActionResult<User> GetPublicUserInfo(string username)
        {
            var user = service.GetPublicUserInfo(username);
            return Ok(new {user.Username, user.Status, user.Bio, user.Avatar, user.CanMessage});
        }


        [Route("searchUsers")]
        [HttpPost]
        public ActionResult<List<User>> searchUsers([FromBody] string query)
        {
            return service.searchUsers(query);
        }

        [Route("banUser")]
        [HttpPost]
        public ActionResult<User> banUser(User user)
        {
            return service.BanUser(user.Email);
        }

        [Route("deleteUser")]
        [HttpPost]
        public ActionResult<Boolean> DeleteUser(User user)
        {
            return service.DeleteUser(user.Email);
        }


        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public ActionResult<User> CreateUser(User user)
        {
            string invalidItem = "";

            if (!service.ValidateUsername(user.Username)) invalidItem += nameof(user.Username);
            if (!service.ValidateEmail(user.Email)) invalidItem += nameof(user.Email);

            // User is correctly created - return 201; If User is already created - return 409
            if (String.IsNullOrEmpty(invalidItem))
            {
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
            var tempUser = service.searchUsers(user.Email);
            var token = service.Authenticate(user.Email, user.Password);

            // TODO: Add proper error handling
            if (token == null || tempUser[0].Banned == true) return Unauthorized();

            return Ok(new { token });
        }

        [Route("profileUpdate")]
        [HttpPost]
        public ActionResult<User> ProfileUpdate(User user)
        {

            var userBeforeUpdate = service.GetUser(user.Id);
            string invalidItem = "";

            // if user wanted to update username, validate if username is unique
            if (user.Username != userBeforeUpdate.Username)
            {
                if (!service.ValidateUsername(user.Username)) invalidItem += nameof(user.Username);
            }

            // if user wanted to update email, validate if email is unique
            if (user.Email != userBeforeUpdate.Email)
            {
                if (!service.ValidateEmail(user.Email)) invalidItem += nameof(user.Email);
            }

            if (String.IsNullOrEmpty(invalidItem))
            {
                service.ProfileUpdate(user);
                return Ok(user);
            }
            return Conflict(invalidItem);
        }

        [AllowAnonymous]
        [HttpPut("updateConnection")]
        public ActionResult<User> UpdateConnection(User user)
        {
            var username = user.Username;
            var connectionId = user.ConnectionID;
            service.setConnectionID(username, connectionId);
            return Ok();
        }

    }
}