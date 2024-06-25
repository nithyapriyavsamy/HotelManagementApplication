
using System.Numerics;
using System.Security.Cryptography;
using System.Text;
using UserManagement.CustomException;
using UserManagement.Interfaces;
using UserManagement.Models;
using UserManagement.Models.DTO;

namespace UserManagement.Services
{
    public class UserService : IUserService
    {
        private readonly IRepo<User, int> _urepo;
        private readonly IRepo<Agent, int> _arepo;
        private readonly IRepo<Customer, int> _crepo;
        private readonly IGenerateToken _tokenGenerate;

        public UserService(IRepo<User,int> urepo,IRepo<Agent,int> arepo,IRepo<Customer,int> crepo,
            IGenerateToken tokenGenerate)
        {
            _urepo = urepo;
            _arepo = arepo;
            _crepo = crepo;
            _tokenGenerate = tokenGenerate;
        }
        public async Task<Agent?> ChangeStatus(UserDTO dto)
        {
            var user = await _urepo.Get(dto.UserId);
            if (user != null)
            {
                user.status = dto.status;
                var result = await _urepo.Update(user);
                if (result != null)
                {
                    Agent agent = new Agent();
                    agent.Users = new User();
                    agent.Users.UserId = result.UserId;
                    agent.Users.Email = result.Email;
                    agent.Users.status = result.status;
                    agent.Users.Role = result.Role;
                    var id = await _arepo.Get(result.UserId);
                    if (id != null)
                    {
                        agent = id;
                    }
                    return agent;
                }
            }
            return null;
        }

        public async Task<bool> CheckForRepeat(string mail)
        {
            var users = await _urepo.GetAll();
            if (users != null)
            {
                foreach (var user in users)
                {
                    if (user.Email == mail)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        public async Task<ICollection<Agent>?> GetAllAgents()
        {
            var agents = await _arepo.GetAll();
            if (agents != null)
            {
                foreach (var agent in agents)
                {
                    agent.Users = await _urepo.Get(agent.AgentId);
                }
                return agents;
            }
            return null;
        }

        public async Task<ICollection<Customer>?> GetAllCustomer()
        {
            var customers = await _crepo.GetAll();
            if (customers != null)
            {
                foreach (var customer in customers)
                {
                    customer.Users = await _urepo.Get(customer.CustomerId);
                }
                return customers;
            }
            return null;
        }

        public async Task<Agent?> GetAgent(UserDTO dto)
        {
            var agent = await _arepo.Get(dto.UserId);
            if (agent != null)
            {
                agent.Users = await _urepo.Get(agent.AgentId);
                return agent;
            }
            return null;
        }
        public async Task<int> GetUserId(string mail)
        {
            var users = await _urepo.GetAll();
            if(users != null)
            {
                foreach (var user in users)
                {
                    if (user.Email == mail)
                    {
                        return user.UserId;
                    }
                }
            }
            return -1;
        }

        public async Task<UserDTO?> Login(UserDTO userDTO)
        {
            if (userDTO.Email != null)
            {
                var id = await GetUserId(userDTO.Email);
                if (id != -1)
                {
                    var user = await _urepo.Get(id);
                    if (user != null)
                    {
                        if (user.HashKey != null && userDTO.Password!=null && user.PasswordHash!=null)
                        {
                            var hmac = new HMACSHA512(user.HashKey);
                            var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                            for (int i = 0; i < userPass.Length; i++)
                            {
                                if (userPass[i] != user.PasswordHash[i])
                                    return null;
                            }
                            userDTO = new UserDTO();
                            userDTO.UserId = user.UserId;
                            userDTO.Email = user.Email;
                            userDTO.Role = user.Role;
                            userDTO.status = user.status;
                            userDTO.Token = _tokenGenerate.GenerateToken(userDTO);
                            return userDTO;
                        }
                    }
                }
            }
            return null;
        }

        public async Task<Agent?> RegisterAgent(AgentRegisterDTO dto)
        {
            if (dto != null && dto.Users!=null)
            {
                if (dto.Users.Email != null && dto.Password!=null)
                {
                    var check = await CheckForRepeat(dto.Users.Email);
                    if (check)
                    {
                        var hmac = new HMACSHA512();
                        dto.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));
                        dto.Users.HashKey = hmac.Key;
                        dto.Users.Role = "Agent";
                        dto.Users.status = "Requested";
                        var result = await _urepo.Add(dto.Users);
                        if (result != null)
                        {
                            dto.AgentId = result.UserId;
                            var agent = Mapper(dto);
                            var res = await _arepo.Add(agent);
                            if (res != null)
                            {
                                return res;
                            }
                        }
                    }
                    else
                    {
                        throw new RepeatationException();
                    }
                }
            }
            return null;
        }

        public async Task<Customer?> RegisterCustomer(CustomerRegisterDTO dto)
        {
            if (dto != null && dto.Users != null)
            {
                if (dto.Users.Email != null && dto.Password != null)
                {
                    var check = await CheckForRepeat(dto.Users.Email);
                    if (check)
                    {
                        var hmac = new HMACSHA512();
                        dto.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));
                        dto.Users.HashKey = hmac.Key;
                        dto.Users.Role = "Customer";
                        dto.Users.status = "Approved";
                        var result = await _urepo.Add(dto.Users);
                        if (result != null)
                        {
                            dto.CustomerId = result.UserId;
                            var customer = Mapper(dto);
                            var res = await _crepo.Add(customer);
                            if (res != null)
                            { 
                                return res;
                            }
                        }
                    }
                    else
                    {
                        throw new RepeatationException();
                    }
                }
            }
            return null;
        }

        private Agent Mapper(AgentRegisterDTO dto)
        {
            Agent agent = new Agent();
            agent.AgentId = dto.AgentId;
            agent.Name = dto.Name;
            agent.DOB = dto.DOB;
            var year = DateTime.Now.Year - dto.DOB.Year;
            if (DateTime.Now.Month > dto.DOB.Month)
                year--;
            agent.Age = year;
            agent.Gender = dto.Gender;
            agent.PhoneNo = dto.PhoneNo;
            return agent;
        }
        private Customer Mapper(CustomerRegisterDTO dto)
        {
            Customer customer = new Customer();
            customer.CustomerId = dto.CustomerId;
            customer.Name = dto.Name;
            customer.DOB = dto.DOB;
            var year = DateTime.Now.Year - dto.DOB.Year;
            if (DateTime.Now.Month > dto.DOB.Month)
                year--;
            customer.Age = year;
            customer.Gender = dto.Gender;
            customer.PhoneNo = dto.PhoneNo;
            return customer;
        }
    }
}
