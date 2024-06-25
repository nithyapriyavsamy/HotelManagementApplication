using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.DTO;
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
    public class AmenityController : ControllerBase
    {
        private readonly IAmenityService _service;
        private readonly ILogger<AmenityController> _logger;

        public AmenityController(IAmenityService service,ILogger<AmenityController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpPost("AddAmenity")]
        [Authorize(Roles = "Agent")]
        [ProducesResponseType(typeof(Amenity), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Amenity>?> Add(Amenity amenity)
        {
            try
            {
                var Result = await _service.Add(amenity);
                if (Result != null)
                    return Ok(Result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot add amenity at this time");
        }

        [HttpDelete("DeleteAmenity")]
        [Authorize(Roles = "Agent")]
        [ProducesResponseType(typeof(Amenity), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Amenity>?> Delete(IdDTO amenity)
        {
            try
            {
                var Result = await _service.Delete(amenity.Id);
                if (Result != null)
                    return Ok(Result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot delete amenity at this time");
        }

        [HttpPost("GetAmenities")]
        [Authorize]
        [ProducesResponseType(typeof(ICollection<Amenity>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<Amenity>>?> GetAll(IdDTO amenity)
        {
            try
            {
                var Result = await _service.GetAll(amenity.Id);
                if (Result != null)
                    return Ok(Result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot fetch amenity at this time");
        }
    }
}
