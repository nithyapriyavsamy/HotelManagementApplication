using HotelFeedback.Models;
using HotelFeedback.Models.DTO;

namespace HotelFeedback.Interfaces
{
    public interface IHotelFeedbackService
    {
        public Task<Feedback?> Add(Feedback feedback);
        public Task<ICollection<Feedback>?> GetAllByUser(int id);
        public Task<OverAllFeedback?> GetOverAll(int id);
    }
}
