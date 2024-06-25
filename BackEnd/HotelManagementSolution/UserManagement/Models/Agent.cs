using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace UserManagement.Models
{
    public class Agent
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AgentId { get; set; }
        [ForeignKey("AgentId")]
        public User? Users { get; set; }

        [StringLength(50, ErrorMessage = "Name must be between 1 and 50 characters", MinimumLength = 1)]
        public string? Name { get; set; }
        public DateTime DOB { get; set; }

        [StringLength(10, ErrorMessage = "Gender must be between 1 and 10 characters", MinimumLength = 1)]
        public string? Gender { get; set; }
        public int Age { get; set; }

        [StringLength(15, ErrorMessage = "Phone number must be between 1 and 15 characters")]
        public string? PhoneNo { get; set; }
    }
}
