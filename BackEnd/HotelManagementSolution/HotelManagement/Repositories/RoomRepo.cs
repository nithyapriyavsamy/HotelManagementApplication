using HotelManagement.CustomExceptions;
using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HotelManagement.Repositories
{
    public class RoomRepo : IRoomRepo<int, Room>
    {
        private readonly HotelContext _context;

        public RoomRepo(HotelContext context)
        {
            _context = context;
        }
        public async Task<Room?> Add(Room item)
        {
            if (_context.Rooms != null)
            {
                try
                {
                    _context.Rooms.Add(item);
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

        public async Task<Room?> Delete(int id)
        {
            if (_context.Rooms != null)
            {
                try
                {
                    var result = await Get(id);
                    if (result != null)
                    {
                        _context.Rooms.Remove(result);
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

        public async Task<Room?> Get(int id)
        {
            if (_context.Rooms != null)
            {
                try
                {
                    var result = await _context.Rooms.FindAsync(id);
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

        public async Task<ICollection<Room>?> GetAll(int id)
        {
            if (_context.Rooms != null)
            {
                try
                {
                    var rooms = await _context.Rooms
                    .Where(r => r.HotelId == id)
                    .ToListAsync();
                    if (rooms.Count > 0)
                    {
                        return rooms;
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

        public async Task<Room?> Update(Room item)
        {
            if (_context.Rooms != null)
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
