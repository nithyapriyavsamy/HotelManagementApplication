namespace HotelFeedback.Custom_Exceptions
{
    public class ContextNotInitializedException : Exception
    {
        string message;
        public ContextNotInitializedException(string msg)
        {
            message = msg;
        }
        public ContextNotInitializedException()
        {
            message = "Currently working with database!!";
        }
        public override string Message
        {
            get { return message; }
        }
    }
}
