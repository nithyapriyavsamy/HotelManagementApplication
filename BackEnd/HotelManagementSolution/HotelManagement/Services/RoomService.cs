using HotelManagement.Interfaces;
using HotelManagement.Models;

namespace HotelManagement.Services
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepo<int, Room> _rrepo;

        public RoomService(IRoomRepo<int, Room> rrepo)
        {
            _rrepo = rrepo;
        }
        public async Task<Room?> Add(Room room)
        {
            var result = await _rrepo.Add(room);
            if (result != null)
                return result;
            return null;
        }

        public async Task<Room?> Delete(int Id)
        {
            var result = await _rrepo.Delete(Id);
            if(result != null) 
                return result;
            return null;
        }

        public async Task<ICollection<Room>?> GetAll(int Id)
        {
            var result = await _rrepo.GetAll(Id);
            if(result != null) 
                return result;
            return null;
        }

        public async Task<Room?> Update(Room room)
        {
            var result = await _rrepo.Update(room);
            if(result != null) 
                return result;
            return null; 
        }
    }
}
