namespace HotelManagement.Interfaces
{
    public interface IHotelRepo<I,H> : IRepo<I,H>
    {
        public Task<ICollection<H>?> GetAll();
    }
}
