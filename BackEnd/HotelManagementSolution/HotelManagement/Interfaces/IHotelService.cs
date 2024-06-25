using HotelManagement.Models;
using HotelManagement.Models.DTO;

namespace HotelManagement.Interfaces
{
    public interface IHotelService
    {
        public Task<Hotel?> Add(Hotel item);
        public Task<Hotel?> Update(Hotel item);
        public Task<Hotel?> Delete(int Id);
        public Task<HotelDTO?> Get(int Id);
        public Task<ICollection<Hotel>?> GetAll();
        public Task<ICollection<Hotel>?> GetAll(int id);
    }
}
