namespace HotelManagement.CustomExceptions
{
    public class ContextNotInitializedException : Exception
    {
        string message;
        public ContextNotInitializedException(string msg)
        {
            message = msg;
        }
        public override string Message
        {
            get { return message; }
        }
    }
}
