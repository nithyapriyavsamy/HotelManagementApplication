using HotelFeedback.Interfaces;
using HotelFeedback.Models;
using HotelFeedback.Models.DTO;

namespace HotelFeedback.Services
{
    public class HotelFeedbackService : IHotelFeedbackService
    {
        private readonly IHotelFeedbackRepo _repo;

        public HotelFeedbackService(IHotelFeedbackRepo repo)
        {
            _repo = repo;
        }
        public async Task<Feedback?> Add(Feedback feedback)
        {
            feedback.CreatedAt = DateTime.Now;
            return await _repo.Add(feedback);
        }

        public async Task<ICollection<Feedback>?> GetAllByUser(int id)
        {
            return await _repo.GetAllByUser(id);
        }

        public async Task<OverAllFeedback?> GetOverAll(int id)
        {
            var feedbacks = await _repo.GetAllByHotel(id);
            OverAllFeedback overallFeedback = new OverAllFeedback();
            if (feedbacks != null && feedbacks.Count>0)
            {
                foreach (var feedback in feedbacks)
                {
                    overallFeedback.Maintenence += feedback.Maintenence;
                    overallFeedback.Food += feedback.Food;
                    overallFeedback.Amenities += feedback.Amenities;
                    overallFeedback.OtherServices += feedback.OtherServices;
                    overallFeedback.ValueForMoney += feedback.ValueForMoney;
                }
                overallFeedback.HotelId = id;
                overallFeedback.Maintenence /= feedbacks.Count;
                overallFeedback.Food /= feedbacks.Count;
                overallFeedback.Amenities /= feedbacks.Count;
                overallFeedback.OtherServices /= feedbacks.Count;
                overallFeedback.ValueForMoney /= feedbacks.Count;
                return overallFeedback;
            }
            return null;
        }
    }
}
