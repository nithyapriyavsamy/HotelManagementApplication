using HotelManagement.Interfaces;
using HotelManagement.Models;

namespace HotelManagement.Services
{
    public class AmenityService : IAmenityService
    {
        private readonly IRoomRepo<int, Amenity> _arepo;

        public AmenityService(IRoomRepo<int,Amenity> arepo)
        {
            _arepo = arepo;
        }
        public async Task<Amenity?> Add(Amenity amenity)
        {
            var result = await _arepo.Add(amenity);
            if(result != null)
            {
                return result;
            }
            return null;
        }

        public async Task<Amenity?> Delete(int Id)
        {
            var result = await _arepo.Delete(Id);
            if (result != null)
            {
                return result;
            }
            return null;
        }

        public async Task<ICollection<Amenity>?> GetAll(int Id)
        {
            var result = await _arepo.GetAll(Id);
            if (result != null)
                return result;
            return null;
        }
    }
}
