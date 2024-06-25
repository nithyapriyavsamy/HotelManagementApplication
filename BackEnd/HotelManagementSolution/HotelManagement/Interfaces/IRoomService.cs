using HotelManagement.Models;

namespace HotelManagement.Interfaces
{
    public interface IRoomService
    {
        public Task<Room?> Update(Room room);
        public Task<Room?> Add(Room room);
        public Task<Room?> Delete(int Id);
        public Task<ICollection<Room>?> GetAll(int Id);
    }
}
