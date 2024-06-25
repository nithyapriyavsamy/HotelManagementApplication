using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Numerics;
using UserManagement.CustomException;
using UserManagement.Interfaces;
using UserManagement.Models;
using UserManagement.Models.DTO;

namespace UserManagement.Controllers
{
    [Route("api/[controller]/action")]
    [ApiController]
    [EnableCors("ReactCors")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService service,ILogger<UserController> logger)
        {
            _service = service;
            _logger = logger;
        }
        [HttpPost("AgentRegister")]
        [ProducesResponseType(typeof(Agent), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<Agent?>> AgentRegisteration(AgentRegisterDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var result = await _service.RegisterAgent(dto);
                    if (result != null)
                        return Created("Agent Added", result);
                }
            }
            catch (RepeatationException)
            {
                return BadRequest("mail id not available");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("mail id not available");
        }

        [HttpPost("CustomerRegister")]
        [ProducesResponseType(typeof(Customer), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<Customer?>> CustomerRegisteration(CustomerRegisterDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var result = await _service.RegisterCustomer(dto);
                    if (result != null)
                        return Created("Customer Added", result);
                }
            }
            catch (RepeatationException)
            {
                return BadRequest("mail id not available");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("mail id not available");
        }

        [HttpPost("Login")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<UserDTO?>> Login(UserDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var user = await _service.Login(dto);
                    if (user != null)
                        return Created("Login Successful", user);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Wrong credentials");
        }

        [HttpPost("ChangeStatus")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(Agent), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<Agent?>> ChangeStatus(UserDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var result = await _service.ChangeStatus(dto);
                    if (result != null)
                        return Ok(result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("can't change at this time");
        }

        [HttpPost("GetAgent")]
        [Authorize(Roles = "Agent")]
        [ProducesResponseType(typeof(Agent), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<Agent?>> GetAgent(UserDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var result = await _service.GetAgent(dto);
                    if (result != null)
                        return Ok(result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("not available");
        }

        [HttpPost("AllCustomers")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(ICollection<Customer?>), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<ICollection<Customer>?>> GetAllCustomer()
        {
            try
            {
                var result = await _service.GetAllCustomer();
                if (result != null)
                    return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Empty");
        }

        [HttpPost("AllAgents")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(ICollection<Agent?>), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<ICollection<Agent>?>> GetAllAgents()
        {
            try
            {
                var result = await _service.GetAllAgents();
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
