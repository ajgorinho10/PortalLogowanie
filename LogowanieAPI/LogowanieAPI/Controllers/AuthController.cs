using System.Text.Json;
using FluentValidation;
using FluentValidation.Results;
using LogowanieAPI.Model;
using LogowanieAPI.Model.DTO.AuthDTO;
using LogowanieAPI.SecurityAndValidation;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace LogowanieAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController(IConfiguration config, ApplicationDbContext context) : Controller
    {
        private readonly IConfiguration _config = config;
        private readonly ApplicationDbContext _context = context;
        private static readonly RegisterRequestValidator _registerRequestValidator = new();
        private static readonly LoginRequestValidator _loginRequestValidator = new();

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterRequest input)
        {
            _registerRequestValidator.ValidateAndThrow(input);

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Login == input.Login);
            if (existingUser != null)
            {
                return Conflict(new AuthResponse(false, "Login already exists"));
            }

            var hashedPassword = PasswordHash.HashAndSalt(input.Password);
            var newUser = new User(input)
            {
                Password = hashedPassword
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new AuthResponse(true, "User created"));
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest input)
        {
            _loginRequestValidator.ValidateAndThrow(input);

            var exitingUser = await _context.Users.FirstOrDefaultAsync(u=> u.Login == input.Login);
            if (exitingUser != null && PasswordHash.VerifyPassword(input.Password,exitingUser.Password))
            {
                var token = Token.GenerateToken(exitingUser, _config);
                return Ok(new AuthResponse(true, "Logged in", token));
            }

            return Unauthorized(new AuthResponse(false,"Login or Password are incorrect"));
        }

    }
}
