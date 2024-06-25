namespace HotelFeedback.Models.DTO
{
    public class OverAllFeedback
    {
        public int HotelId { get; set; }
        public int Maintenence { get; set; }
        public int Food { get; set; }
        public int Amenities { get; set; }
        public int OtherServices { get; set; }
        public int ValueForMoney { get; set; }
    }
}
