namespace HotelManagement.Interfaces
{
    public interface IRepo <I,H>
    {
        public Task<H?> Add(H item);
        public Task<H?> Delete(I id);
        public Task<H?> Update(H item);
        public Task<H?> Get(I id);
    }
}
