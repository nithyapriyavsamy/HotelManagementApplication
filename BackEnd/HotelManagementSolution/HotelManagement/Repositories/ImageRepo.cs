using HotelManagement.CustomExceptions;
using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.Context;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Repositories
{
    public class ImageRepo : IRoomRepo<int, Image>
    {
        private readonly HotelContext _context;

        public ImageRepo(HotelContext context)
        {
            _context = context;
        }
        public async Task<Image?> Add(Image item)
        {
            if (_context.Images != null)
            {
                try
                {
                    _context.Images.Add(item);
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

        public async Task<Image?> Delete(int id)
        {
            if (_context.Images != null)
            {
                try
                {
                    var result = await Get(id);
                    if (result != null)
                    {
                        _context.Images.Remove(result);
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

        public async Task<Image?> Get(int id)
        {
            if (_context.Images != null)
            {
                try
                {
                    var result = await _context.Images.FindAsync(id);
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

        public async Task<ICollection<Image>?> GetAll(int id)
        {
            if (_context.Images != null)
            {
                try
                {
                    var images = await _context.Images
                    .Where(r => r.HotelId == id)
                    .ToListAsync();
                    if (images.Count > 0)
                    {
                        return images;
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

        public async Task<Image?> Update(Image item)
        {
            if (_context.Images != null)
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
