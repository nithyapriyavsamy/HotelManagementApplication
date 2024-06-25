using System.ComponentModel.DataAnnotations;

namespace HotelFeedback.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public int HotelId { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int Maintenence { get; set; }
        public int Food { get; set; }
        public int Amenities { get; set; }
        public int OtherServices { get; set; }
        public int ValueForMoney { get; set; }
        public string? Review { get; set; }
    }
}
