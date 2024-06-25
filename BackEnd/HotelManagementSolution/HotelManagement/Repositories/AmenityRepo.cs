using HotelManagement.CustomExceptions;
using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.Context;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Repositories
{
    public class AmenityRepo : IRoomRepo<int, Amenity>
    {
        private readonly HotelContext _context;

        public AmenityRepo(HotelContext context)
        {
            _context = context;
        }
        public async Task<Amenity?> Add(Amenity item)
        {
            if (_context.Amenities != null)
            {
                try
                {
                    _context.Amenities.Add(item);
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

        public async Task<Amenity?> Delete(int id)
        {
            if (_context.Amenities != null)
            {
                try
                {
                    var result = await Get(id);
                    if (result != null)
                    {
                        _context.Amenities.Remove(result);
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

        public async Task<Amenity?> Get(int id)
        {
            if (_context.Amenities != null)
            {
                try
                {
                    var result = await _context.Amenities.FindAsync(id);
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

        public async Task<ICollection<Amenity>?> GetAll(int id)
        {
            if (_context.Amenities != null)
            {
                try
                {
                    var amenities = await _context.Amenities
                    .Where(r => r.HotelId == id)
                    .ToListAsync();
                    if (amenities.Count > 0)
                    {
                        return amenities;
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

        public async Task<Amenity?> Update(Amenity item)
        {
            if (_context.Rooms != null)
            {
                try
                {
                    var result = await Get(item.Id);
                    if (result != null)
                    {
                        _context.Entry(result).CurrentValues.SetValues(item);
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
