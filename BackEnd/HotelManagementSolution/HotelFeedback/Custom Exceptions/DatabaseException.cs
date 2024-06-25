namespace HotelFeedback.Custom_Exceptions
{
    public class DatabaseException : Exception
    {
        string message;
        public DatabaseException(string msg)
        {
            message = msg;
        }
        public DatabaseException()
        {
            message = "Currently working with database!!";
        }
        public override string Message
        {
            get { return message; }
        }
    }
}
