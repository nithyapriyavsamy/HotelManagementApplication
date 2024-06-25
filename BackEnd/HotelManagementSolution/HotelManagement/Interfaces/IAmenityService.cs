using HotelManagement.Models;

namespace HotelManagement.Interfaces
{
    public interface IAmenityService
    {
        public Task<Amenity?> Add(Amenity amenity);
        public Task<Amenity?> Delete(int Id);
        public Task<ICollection<Amenity>?> GetAll(int Id);
    }
}
