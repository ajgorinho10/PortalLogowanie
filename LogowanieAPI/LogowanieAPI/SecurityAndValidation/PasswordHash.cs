using System.Security.Cryptography;

namespace LogowanieAPI.SecurityAndValidation
{
    public class PasswordHash
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 10000;

        private static byte[] GenerateSalt()
        {
            byte[] salt = new byte[SaltSize];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        private static string HashPassword(string password, byte[] salt)
        {
            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(HashSize);
            return Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);
        }

        public static bool VerifyPassword(string password, string storedHash)
        {
            var parts = storedHash.Split(':');
            if (parts.Length != 2) return false;

            byte[] salt = Convert.FromBase64String(parts[0]);
            string hashedInput = HashPassword(password, salt);

            return hashedInput == storedHash;
        }

        public static string HashAndSalt(string password)
        {

            byte[] salt = GenerateSalt();
            string hashedPassword = HashPassword(password, salt);

            Console.WriteLine($"Hasło: {password}");
            Console.WriteLine($"Hashed: {hashedPassword}");

            bool isMatch = VerifyPassword("SuperSecret123!", hashedPassword);
            Console.WriteLine($"Czy hasło pasuje? {isMatch}");

            return hashedPassword;
        }
    }
}
