namespace Infrastructure
{
    public class Module
    {

    }
    public static class ExtensionMethods
    {
        public static bool StringIsNullOrEmptyOrWhiteSpaces(this string str)
        {
            if (string.IsNullOrEmpty(str) || string.IsNullOrWhiteSpace(str))
                return true;
            return false;
        }
    }
}
