using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Helpers
{
    public class RandomStringGenerator
    {
        // A constant string that contains all the letters in the alphabet
        private const string Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        // A random number generator
        private static readonly Random Random = new Random();

        // A method that takes an integer parameter and returns a random string of that length
        public static string Generate(int length)
        {
            // Check if the length is valid
            if (length < 0)
            {
                throw new ArgumentException("Length must be non-negative");
            }

            // Create a string builder to store the result
            var result = new StringBuilder(length);

            // Loop for the given length
            for (int i = 0; i < length; i++)
            {
                // Get a random index from the letters string
                int index = Random.Next(Letters.Length);

                // Append the corresponding letter to the result
                result.Append(Letters[index]);
            }

            // Return the result as a string
            return result.ToString();
        }
    }
}
