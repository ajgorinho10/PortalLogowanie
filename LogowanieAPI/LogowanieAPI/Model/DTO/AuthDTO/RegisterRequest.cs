using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace LogowanieAPI.Model.DTO.AuthDTO
{
    public class RegisterRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
