using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Models.DTO
{
    public class HotelDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? ContactNumber { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public double? MinimumPrice { get; set; }
        public double? MaximumPrice { get; set; }
        public int? AgentId { get; set; }
        public ICollection<Image>? Images { get; set; }
        public ICollection<Amenity>? AmenityType { get; set; }
        public ICollection<Room>? Rooms { get; set; }
    }
}
