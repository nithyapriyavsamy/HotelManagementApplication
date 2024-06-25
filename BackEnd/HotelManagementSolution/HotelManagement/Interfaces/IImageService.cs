using HotelManagement.Models;

namespace HotelManagement.Interfaces
{
    public interface IImageService
    {
        public Task<Image?> Add(Image image);
        public Task<Image?> Delete(int Id);
        public Task<ICollection<Image>?> GetAll(int Id);
    }
}
