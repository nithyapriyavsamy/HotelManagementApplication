using Microsoft.EntityFrameworkCore;

namespace HotelFeedback.Models.Context
{
    public class FeedbackContext : DbContext
    {
        public FeedbackContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Feedback>? Feedbacks { get; set; }
    }
}
