using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rtchatty.Models;
using rtchatty.Services;

namespace rtchatty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelController : Controller
    {
        private readonly ChannelService service;

        public ChannelController(ChannelService _service)
        {
            service = _service;
        }

        [HttpPost]
        [Route("create")]
        public ActionResult<Channel> CreateChannel(Channel channel) 
        {
            string invalidItem = "";

            if (!service.ValidateChannelName(channel.Name)) 
            {
                return Conflict(nameof(channel.Name));
            }
            else 
            {
                var createdChannel = service.CreateChannel(channel);
                return CreatedAtAction("CreateChannel", createdChannel);
            }

        }
    }
}