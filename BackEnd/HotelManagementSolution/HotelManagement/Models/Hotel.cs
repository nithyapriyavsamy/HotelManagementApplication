using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

namespace HotelManagement.Models
{
    public class Hotel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = "Should Not Exceed More Than 35 Characters")]
        public string? Name { get; set; }

        [Required]
        [MinLength(25, ErrorMessage = "Should Be Atleast 25 Characters")]
        public string? Description { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }

        [Required]
        public string? Address { get; set; }

        [Required]
        [MinLength(10, ErrorMessage = "Contact Number Must Contain 10 Characters")]
        public string? ContactNumber { get; set; }

        [Required]
        public string? City { get; set; }

        [Required]
        public string? Country { get; set; }

        [Required]
        public string? State { get; set; }

        [Required]
        public double? MinimumPrice { get; set; }

        [Required]
        public double? MaximumPrice { get; set; }

        [Required]
        public int? AgentId { get; set; }

    }
}
