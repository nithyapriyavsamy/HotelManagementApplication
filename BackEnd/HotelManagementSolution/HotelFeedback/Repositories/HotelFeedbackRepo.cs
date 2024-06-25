using HotelFeedback.Custom_Exceptions;
using HotelFeedback.Interfaces;
using HotelFeedback.Models;
using HotelFeedback.Models.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HotelFeedback.Repositories
{
    public class HotelFeedbackRepo : IHotelFeedbackRepo
    {
        private readonly FeedbackContext _context;

        public HotelFeedbackRepo(FeedbackContext context)
        {
            _context = context;
        }
        public async Task<Feedback?> Add(Feedback feedback)
        {
            if (_context.Feedbacks != null)
            {
                try
                {
                    _context.Feedbacks.Add(feedback);
                    await _context.SaveChangesAsync();
                    return feedback;
                }
                catch (Exception)
                {
                    throw new DatabaseException();
                }
            }
            else
            {
                throw new ContextNotInitializedException();
            }
        }

        public async Task<ICollection<Feedback>?> GetAllByHotel(int id)
        {
            if (_context.Feedbacks != null)
            {
                try
                {
                    var feedbacks = await _context.Feedbacks.Where(s => s.HotelId == id).ToListAsync();
                    if (feedbacks.Count > 0)
                        return feedbacks;
                    return null;
                }
                catch (Exception)
                {
                    throw new DatabaseException();
                }
            }
            else
            {
                throw new ContextNotInitializedException();
            }
        }

        public async Task<ICollection<Feedback>?> GetAllByUser(int id)
        {
            if (_context.Feedbacks != null)
            {
                try
                {
                    var feedbacks = await _context.Feedbacks.Where(s => s.UserId == id).ToListAsync();
                    if (feedbacks.Count > 0)
                        return feedbacks;
                    return null;
                }
                catch (Exception)
                {
                    throw new DatabaseException();
                }
            }
            else
            {
                throw new ContextNotInitializedException();
            }
        }
    }
}
