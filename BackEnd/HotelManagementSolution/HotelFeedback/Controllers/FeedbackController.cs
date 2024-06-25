using HotelFeedback.Interfaces;
using HotelFeedback.Models;
using HotelFeedback.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelFeedback.Controllers
{
    [Route("api/[controller]/action")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IHotelFeedbackService _service;
        private readonly ILogger<FeedbackController> _logger;

        public FeedbackController(IHotelFeedbackService service,ILogger<FeedbackController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpPost("AddFeedback")]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<Feedback?>> AddFeedback(Feedback feedback)
        {
            try
            {
                if (feedback != null)
                {
                    var result = await _service.Add(feedback);
                    if (result != null)
                        return Created("Feedback Added", result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Can't add at this time");
        }

        [HttpPost("FeedbackByUser")]
        /*[Authorize(Roles = "Admin")]*/
        [ProducesResponseType(typeof(ICollection<Feedback?>), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<ICollection<Feedback>?>> GetAllFeedbackByUser(IdDTO dto)
        {
            try
            {
                var result = await _service.GetAllByUser(dto.Id);
                if (result != null)
                    return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Empty");
        }

        [HttpPost("OverAllFeedback")]
        /*[Authorize(Roles = "Admin")]*/
        [ProducesResponseType(typeof(OverAllFeedback), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<ICollection<Feedback>?>> GetOverAllFeedback(IdDTO dto)
        {
            try
            {
                var result = await _service.GetOverAll(dto.Id);
                if (result != null)
                    return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Empty");
        }
    }
}
