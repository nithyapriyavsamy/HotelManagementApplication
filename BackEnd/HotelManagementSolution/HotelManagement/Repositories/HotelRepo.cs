using HotelManagement.CustomExceptions;
using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace HotelManagement.Repositories
{
    public class HotelRepo : IHotelRepo<int, Hotel>
    {
        private readonly HotelContext _context;

        public HotelRepo(HotelContext context)
        {
            _context = context;
        }
        public async Task<Hotel?> Add(Hotel item)
        {
            if(_context.Hotels != null)
            {
                try
                {
                    _context.Hotels.Add(item);
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

        public async Task<Hotel?> Delete(int id)
        {
            if (_context.Hotels != null)
            {
                try
                {
                    var result = await Get(id);
                    if(result != null)
                    {
                        _context.Hotels.Remove(result);
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

        public async Task<Hotel?> Get(int id)
        {
            if (_context.Hotels != null)
            {
                try
                {
                    var result = await _context.Hotels.FindAsync(id);
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

        public async Task<ICollection<Hotel>?> GetAll()
        {
            if (_context.Hotels != null)
            {
                try
                {
                    var result = await _context.Hotels.ToListAsync();
                    if(result.Count > 0)
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

        public async Task<Hotel?> Update(Hotel item)
        {
            if (_context.Hotels != null)
            {
                try
                {
                    var result = await Get(item.Id);
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
