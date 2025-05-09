using System.ComponentModel.DataAnnotations;

namespace LogowanieAPI.Model.DTO.AuthDTO
{
    public class LoginRequest
    {
        public required string Login { get; set; } = string.Empty;
        public required string Password { get; set; } = string.Empty;
    }
}
