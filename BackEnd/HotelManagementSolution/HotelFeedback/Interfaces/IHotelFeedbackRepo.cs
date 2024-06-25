using HotelFeedback.Models;

namespace HotelFeedback.Interfaces
{
    public interface IHotelFeedbackRepo
    {
        public Task<Feedback?> Add(Feedback feedback);
        public Task<ICollection<Feedback>?> GetAllByHotel(int id);
        public Task<ICollection<Feedback>?> GetAllByUser(int id);
    }
}
