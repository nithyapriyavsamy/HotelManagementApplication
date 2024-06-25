namespace UserManagement.CustomException
{
    public class DatabaseException : Exception
    {
        string message;
        public DatabaseException(string msg)
        {
            message = msg;
        }
        public override string Message
        {
            get { return message; }
        }
    }
}
