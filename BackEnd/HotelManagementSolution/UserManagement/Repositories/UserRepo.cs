using Microsoft.EntityFrameworkCore;
using UserManagement.CustomException;
using UserManagement.Interfaces;
using UserManagement.Models;
using UserManagement.Models.Context;

namespace UserManagement.Repositories
{
    public class UserRepo : IRepo<User, int>
    {
        private readonly UserContext _context;

        public UserRepo(UserContext context)
        {
            _context = context;
        }
        public async Task<User?> Add(User item)
        {
            if (_context.Users != null)
            {
                try
                {
                    _context.Users.Add(item);
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

        public async Task<User?> Delete(int id)
        {
            if (_context.Users != null)
            {
                try
                {
                    var result = await Get(id);
                    if (result != null)
                    {
                        _context.Users.Remove(result);
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

        public async Task<User?> Get(int id)
        {
            if (_context.Users != null)
            {
                try
                {
                    var result = await _context.Users.FindAsync(id);
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

        public async Task<ICollection<User>?> GetAll()
        {
            if (_context.Users != null)
            {
                try
                {
                    var result = await _context.Users.ToListAsync();
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

        public async Task<User?> Update(User item)
        {
            if (_context.Users != null)
            {
                try
                {
                    var result = await Get(item.UserId);
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
