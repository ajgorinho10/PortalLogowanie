using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using LogowanieAPI.Model.DTO.AuthDTO;
using Microsoft.EntityFrameworkCore;

namespace LogowanieAPI.Model
{
    [Index(nameof(Login), IsUnique=true)]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName {  get; set; }
        public required string Login { get; set; }
        public required string Password { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public User() { }

        [SetsRequiredMembers]
        public User(string firstName, string lastName, string login, string password)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Login = login;
            this.Password = password;
        }

        public User(string firstName, string lastName, string login, string password,string refreshToken, DateTime refreshTokenExpiryTime)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Login = login;
            this.Password = password;
            this.RefreshToken = refreshToken;
            RefreshTokenExpiryTime = refreshTokenExpiryTime;
        }

        [SetsRequiredMembers]
        public User(RegisterRequest u)
        {
            this.FirstName = u.FirstName;
            this.LastName = u.LastName;
            this.Login = u.Login;
            this.Password = u.Password;
        }
    }
}
