using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.DTO;
using HotelManagement.Repositories;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HotelManagement.Services
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepo<int, Hotel> _hrepo;
        private readonly IRoomRepo<int, Image> _irepo;
        private readonly IRoomRepo<int, Amenity> _arepo;
        private readonly IRoomRepo<int, Room> _irrepo;

        public HotelService(IHotelRepo<int,Hotel> hrepo,IRoomRepo<int,Image> irepo,IRoomRepo<int,Amenity> arepo,IRoomRepo<int,Room> irrepo)
        {
            _hrepo = hrepo;
            _irepo = irepo;
            _arepo = arepo;
            _irrepo = irrepo;
        }
        public async Task<Hotel?> Add(Hotel item)
        {
            if(item != null)
            {
                var addHotel = await _hrepo.Add(item);
                if (addHotel != null)
                    return addHotel;
            }
            return null;
        }

        public async Task<Hotel?> Delete(int Id)
        {
            var deleteHotel = await _hrepo.Delete(Id);
            if (deleteHotel != null)
                return deleteHotel;
            return null;
        }

        public async Task<HotelDTO?> Get(int Id)
        {
            var result = await _hrepo.Get(Id);
            if(result != null)
            {
                var mapped = await Mapper(result);
                return mapped;
            }
            return null;
        }

        public async Task<ICollection<Hotel>?> GetAll()
        {
            var result = await _hrepo.GetAll();
            if (result != null)
            {
                return result;
            }
            return null;
        }

        public async Task<Hotel?> Update(Hotel item)
        {
            var result = await _hrepo.Update(item);
            if(result != null) 
                return result;
            return null;
        }
        private static Hotel? Mapper(HotelDTO dto)
        {
            Hotel hotel = new Hotel();
            hotel.Id = dto.Id;
            hotel.Name = dto.Name;
            hotel.Description = dto.Description;
            hotel.Email = dto.Email;
            hotel.Address = dto.Address;
            hotel.ContactNumber = dto.ContactNumber;
            hotel.City = dto.City;
            hotel.Country = dto.Country;
            hotel.State = dto.State;
            hotel.MaximumPrice = dto.MaximumPrice;
            hotel.MinimumPrice = dto.MinimumPrice;
            hotel.AgentId = dto.AgentId;
            return hotel;
        }
        private async Task<HotelDTO?> Mapper(Hotel dto)
        {
            HotelDTO hotel = new HotelDTO();
            hotel.Id = dto.Id;
            hotel.Name = dto.Name;
            hotel.Description = dto.Description;
            hotel.Email = dto.Email;
            hotel.Address = dto.Address;
            hotel.ContactNumber = dto.ContactNumber;
            hotel.City = dto.City;
            hotel.Country = dto.Country;
            hotel.State = dto.State;
            hotel.MaximumPrice = dto.MaximumPrice;
            hotel.MinimumPrice = dto.MinimumPrice;
            hotel.AgentId = dto.AgentId;
            hotel.Images =await  _irepo.GetAll(dto.Id);
            hotel.AmenityType = await _arepo.GetAll(dto.Id);
            hotel.Rooms = await _irrepo.GetAll(dto.Id);
            return hotel;
        }

        public async Task<ICollection<Hotel>?> GetAll(int id)
        {
            var result = await _hrepo.GetAll();
            List<Hotel> res = new List<Hotel>();
            if (result != null)
            {
                foreach(var hotel in result)
                {
                    if (hotel.AgentId == id)
                    {
                        res.Add(hotel);
                    }
                }
                return res;
            }
            return null;
        }
    }
}
