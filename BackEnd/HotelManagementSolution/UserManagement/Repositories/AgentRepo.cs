using Microsoft.EntityFrameworkCore;
using UserManagement.CustomException;
using UserManagement.Interfaces;
using UserManagement.Models;
using UserManagement.Models.Context;

namespace UserManagement.Repositories
{
    public class AgentRepo : IRepo<Agent, int>
    {
        private readonly UserContext _context;

        public AgentRepo(UserContext context)
        {
            _context = context;
        }
        public async Task<Agent?> Add(Agent item)
        {
            if (_context.Agents != null)
            {
                try
                {
                    _context.Agents.Add(item);
                    await _context.SaveChangesAsync();
                    return item;
                }
                catch (Exception)
                {
                    throw new DatabaseException("Currently working with database!!");
                }
            }
            else
            {
                throw new ContextNotInitializedException("Context not initialized");
            }
        }

        public async Task<Agent?> Delete(int id)
        {
            if (_context.Agents != null)
            {
                try
                {
                    var result = await Get(id);
                    if (result != null)
                    {
                        _context.Agents.Remove(result);
                        await _context.SaveChangesAsync();
                        return result;
                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception)
                {
                    throw new DatabaseException("Currently working with database!!");
                }
            }
            else
            {
                throw new ContextNotInitializedException("Context not initialized");
            }
        }

        public async Task<Agent?> Get(int id)
        {
            if (_context.Agents != null)
            {
                try
                {
                    var result = await _context.Agents.FindAsync(id);
                    return result;
                }
                catch (Exception)
                {
                    throw new DatabaseException("Currently working with database!!");
                }
            }
            else
            {
                throw new ContextNotInitializedException("Context not initialized");
            }
        }

        public async Task<ICollection<Agent>?> GetAll()
        {
            if (_context.Agents != null)
            {
                try
                {
                    var result = await _context.Agents.ToListAsync();
                    if (result.Count > 0)
                    {
                        return result;
                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception)
                {
                    throw new DatabaseException("Currently working with database!!");
                }
            }
            else
            {
                throw new ContextNotInitializedException("Context not initialized");
            }
        }

        public async Task<Agent?> Update(Agent item)
        {
            if (_context.Agents != null)
            {
                try
                {
                    var result = await Get(item.AgentId);
                    if (result != null)
                    {
                        _context.Entry(result).CurrentValues.SetValues(item);
                        await _context.SaveChangesAsync();
                        return result;
                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception)
                {
                    throw new DatabaseException("Currently working with database!!");
                }
            }
            else
            {
                throw new ContextNotInitializedException("Context not initialized");
            }
        }
    }
}
