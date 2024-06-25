using UserManagement.Interfaces;
using UserManagement.Models;
using UserManagement.Models.Context;
using UserManagement.Repositories;
using UserManagement.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace TestUserService
{
    [TestClass]
    public class UnitTest1
    {
        public DbContextOptions<UserContext> GetDbcontextOption()
        {
            var contextOptions = new DbContextOptionsBuilder<UserContext>()
                                   .UseInMemoryDatabase(databaseName: "testMemory")
                                    .Options;
            return contextOptions;
        }
        [TestMethod]
        public async Task TestGetAllAgents()
        {
            using (var userContext = new UserContext(GetDbcontextOption()))
            {
                    if (userContext.Agents != null)
                    {
                        userContext.Agents.Add(new Agent
                        {
                            AgentId = 1,
                            Name = "Somu s",
                            DOB = new DateTime(2001, 09, 12),
                            Age = 22,
                            PhoneNo = "1234567890",
                            Gender = "Male",
                            Users = new User() { UserId = 1, Email = "somu@gmail.com", PasswordHash = new byte[] { }, HashKey = new byte[] { }, Role = "Agent", status = "Not Approved" },
                        }); ; ;
                    }
                    await userContext.SaveChangesAsync();
                    IRepo<Agent, int> repo = new AgentRepo(userContext);
                    var data = await repo.GetAll();
                    if (data != null)
                    {
                        Assert.AreEqual(1, data.ToList().Count);
                    }
                }

        }

        [TestMethod]
        public async Task TestGetAllCustomers()
        {
            using (var userContext = new UserContext(GetDbcontextOption()))
            {
                if (userContext.Customers!=null)
                {
                    userContext.Customers.Add(new Customer
                    {
                        CustomerId = 1,
                        Name = "Somu s",
                        DOB = new DateTime(2001, 09, 12),
                        Age = 22,
                        PhoneNo = "1234567890",
                        Gender = "Male",
                        Users = new User() { UserId = 1, Email = "somu@gmail.com", PasswordHash = new byte[] { }, HashKey = new byte[] { }, Role = "Agent", status = "Not Approved" },
                    }); ; ;
                }
                    await userContext.SaveChangesAsync();
                    IRepo<Customer, int> repo = new CustomerRepo(userContext);
                    var data = await repo.GetAll();
                if (data != null)
                {
                    Assert.AreEqual(1, data.ToList().Count);
                }
            }

        }
        [TestMethod]
        public async Task TestAddAgent()
        {
            using (var userContext = new UserContext(GetDbcontextOption()))
            {
                IRepo<Agent, int> repo = new AgentRepo(userContext);

                var agent = new Agent
                {
                    AgentId = 1,
                    Name = "Somu s",
                    DOB = new DateTime(2001, 09, 12),
                    Age = 22,
                    PhoneNo = "1234567890",
                    Gender = "Male",
                    Users = new User() { UserId = 1, Email = "somu@gmail.com", PasswordHash = new byte[] { }, HashKey = new byte[] { }, Role = "Agent", status = "Not Approved" },
                };

                var addedAgent = await repo.Add(agent);
                Assert.IsNotNull(addedAgent);

                if (userContext.Agents != null)
                {
                    var savedagent = await userContext.Agents.FirstOrDefaultAsync(r => r.AgentId == 1);
                    Assert.IsNotNull(savedagent);
                    Assert.AreEqual(agent.AgentId, savedagent.AgentId);
                }
            }
        }

    }
}