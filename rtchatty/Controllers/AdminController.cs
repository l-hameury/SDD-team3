using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Core.Authentication;
using rtchatty.Models;
using rtchatty.Services;
using System.Linq;


namespace rtchatty.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly AdminService service;

        public AdminController(AdminService _service)
        {
            service = _service;
        }

        [Route("isAdmin")]
        [HttpGet]
        public ActionResult<Boolean> isAdmin()
        {

            ClaimsIdentity identity = User.Identity as ClaimsIdentity;
            IEnumerable<Claim> claims = identity.Claims;
            var email = claims.FirstOrDefault().Value;
            return service.IsAdmin(email);
        }

        [Route("banUser")]
        [HttpPost]
        public ActionResult<User> banUser(AdminRequest adminRequest)
        {
            var canBan = isAdmin();
            return canBan.Value == true ? service.BanUser(adminRequest.UserEmail) : Unauthorized();
        }

        [Route("setAdminStatus")]
        [HttpPost]
        public ActionResult<User> addAdmin(AdminRequest adminRequest)
        {
            var canAdd = isAdmin();
            return canAdd.Value == true ? service.SetAdminStatus(adminRequest.UserEmail) : Unauthorized();
        }

        [Route("deleteUser")]
        [HttpPost]
        public ActionResult<Boolean> DeleteUser(AdminRequest adminRequest)
        {
            var canDelete = isAdmin();
            return canDelete.Value == true ? service.DeleteUser(adminRequest.UserEmail) : Unauthorized();
        }
    }
}