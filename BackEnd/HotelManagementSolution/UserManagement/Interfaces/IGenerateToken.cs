using UserManagement.Models.DTO;

namespace UserManagement.Interfaces
{
    public interface IGenerateToken
    {
        public string GenerateToken(UserDTO user);
    }
}
