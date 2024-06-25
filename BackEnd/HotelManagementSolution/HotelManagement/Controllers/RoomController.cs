using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.DTO;
using HotelManagement.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]/action")]
    [ApiController]
    [EnableCors("ReactCors")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _service;
        private readonly ILogger<RoomController> _logger;

        public RoomController(IRoomService service, ILogger<RoomController> logger)
        {
            _service = service;
            _logger = logger;
        }


        [HttpPost("AddRoom")]
        [Authorize(Roles = "Agent")]
        [ProducesResponseType(typeof(Room), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Room>?> Add(Room room)
        {
            try
            {
                var Result = await _service.Add(room);
                if (Result != null)
                    return Ok("Room Successfully Added!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot add room at this time");
        }

        [HttpPost("DeleteRoom")]
        [Authorize(Roles = "Agent")]
        [ProducesResponseType(typeof(Room), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Room>?> Delete(IdDTO room)
        {
            try
            {
                var Result = await _service.Delete(room.Id);
                if (Result != null)
                    return Ok("Room Successfully Deleted!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot Delete room at this time");
        }

        [HttpPut("UpdateRoom")]
        [Authorize(Roles = "Agent")]
        [ProducesResponseType(typeof(Room), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Room>?> Update(Room room)
        {
            try
            {
                var Result = await _service.Update(room);
                if (Result != null)
                    return Ok("Room Successfully Updated!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot update room at this time");
        }

        [HttpPost("GetRooms")]
        [Authorize]
        [ProducesResponseType(typeof(ICollection<Room>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<Room>>?> GetRooms(IdDTO room)
        {
            try
            {
                var Result = await _service.GetAll(room.Id);
                if (Result != null)
                    return Ok(Result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot add room at this time");
        }
    }
}
