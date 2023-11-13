using System.ComponentModel.DataAnnotations;

namespace Infrastructure.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [MaxLength(15, ErrorMessage = "username must be at most 15 caracters long")]
        [MinLength(6, ErrorMessage = "username must be at least 6 caracters long")]
        public string Username { get; set; }
        [Required]
        [RegularExpression("^(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{6,}$"
            , ErrorMessage = "password should be at least 6 caracters long, contains at least one Uppercase, one digit and one symbol.")]
        public string Password { get; set; }
        public string? ProfileImage { get; set; }
    }
}
