namespace HotelManagement.Interfaces
{
    public interface IRoomRepo<I,H> : IRepo<I,H>
    {
        public Task<ICollection<H>?> GetAll(I id);
    }
}
