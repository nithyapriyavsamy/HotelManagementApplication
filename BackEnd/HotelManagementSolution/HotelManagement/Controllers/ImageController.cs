using HotelManagement.Interfaces;
using HotelManagement.Models.DTO;
using HotelManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCors")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _service;
        private readonly ILogger<ImageController> _logger;

        public ImageController(IImageService service, ILogger<ImageController> logger)
        {
            _service = service;
            _logger = logger;
        }
        [HttpPost("AddImage")]
        [Authorize(Roles = "Agent")]
        [ProducesResponseType(typeof(Image), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Image>?> Add(Image image)
        {
            try
            {
                var Result = await _service.Add(image);
                if (Result != null)
                    return Ok("Image Successfully Added!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot add image at this time");
        }

        [HttpDelete("DeleteImage")]
        [ProducesResponseType(typeof(Image), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Image>?> Delete(IdDTO image)
        {
            try
            {
                var Result = await _service.Delete(image.Id);
                if (Result != null)
                    return Ok("Amenity Successfully Deleted!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot delete image at this time");
        }

        [HttpPost("GetImages")]
        [ProducesResponseType(typeof(ICollection<Image>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<Image>>?> GetAll(IdDTO image)
        {
            try
            {
                var Result = await _service.GetAll(image.Id);
                if (Result != null)
                    return Ok(Result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot fetch images at this time");
        }
    }
}
