using HotelManagement.Interfaces;
using HotelManagement.Models;

namespace HotelManagement.Services
{
    public class ImageService : IImageService
    {
        private readonly IRoomRepo<int, Image> _irepo;

        public ImageService(IRoomRepo<int,Image> irepo)
        {
            _irepo = irepo;
        }
        public async Task<Image?> Add(Image image)
        {
            var result = await _irepo.Add(image);
            if(result != null)
            {
                return result;
            }
            return null;
        }

        public async Task<Image?> Delete(int Id)
        {
            var result = await _irepo.Delete(Id);
            if (result != null)
                return result;
            return null;
        }

        public async Task<ICollection<Image>?> GetAll(int Id)
        {
            var result = await _irepo.GetAll(Id);
            if (result != null)
                return result;
            return null;
        }
    }
}
