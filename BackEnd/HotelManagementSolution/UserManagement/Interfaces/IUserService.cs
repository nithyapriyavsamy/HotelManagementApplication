using System.Numerics;
using UserManagement.Models;
using UserManagement.Models.DTO;

namespace UserManagement.Interfaces
{
    public interface IUserService
    {
        public Task<Agent?> RegisterAgent(AgentRegisterDTO dto);
        public Task<Customer?> RegisterCustomer(CustomerRegisterDTO dto);
        public Task<Agent?> ChangeStatus(UserDTO dto);
        public Task<ICollection<Agent>?> GetAllAgents();
        public Task<ICollection<Customer>?> GetAllCustomer();
        public Task<Boolean> CheckForRepeat(string mail);
        public Task<Agent?> GetAgent(UserDTO dto);
        public Task<UserDTO?> Login(UserDTO userDTO);
        public Task<int> GetUserId(string mail);
    }
}
