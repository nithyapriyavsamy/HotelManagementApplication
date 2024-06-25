using Microsoft.EntityFrameworkCore;
using UserManagement.CustomException;
using UserManagement.Interfaces;
using UserManagement.Models;
using UserManagement.Models.Context;

namespace UserManagement.Repositories
{
    public class CustomerRepo : IRepo<Customer, int>
    {
        private readonly UserContext _context;

        public CustomerRepo(UserContext context)
        {
            _context=context;
        }
        public async Task<Customer?> Add(Customer item)
        {
            if (_context.Customers != null)
            {
                try
                {
                    _context.Customers.Add(item);
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

        public async Task<Customer?> Delete(int id)
        {
            if (_context.Customers != null)
            {
                try
                {
                    var result = await Get(id);
                    if (result != null)
                    {
                        _context.Customers.Remove(result);
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

        public async Task<Customer?> Get(int id)
        {
            if (_context.Customers != null)
            {
                try
                {
                    var result = await _context.Customers.FindAsync(id);
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

        public async Task<ICollection<Customer>?> GetAll()
        {
            if (_context.Customers != null)
            {
                try
                {
                    var result = await _context.Customers.ToListAsync();
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

        public async Task<Customer?> Update(Customer item)
        {
            if (_context.Customers != null)
            {
                try
                {
                    var result = await Get(item.CustomerId);
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
