using LogowanieAPI.Model;
using LogowanieAPI.Model.DTO.AuthDTO;
using LogowanieAPI.SecurityAndValidation;


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using LogowanieAPI.SecurityAndValidation.Token;
using System.Security.Claims;

namespace LogowanieAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController(IConfiguration config, ApplicationDbContext context, ITokenService token) : Controller
    {
        private readonly IConfiguration _config = config;
        private readonly ApplicationDbContext _context = context;
        private readonly ITokenService _tokenService = token;

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

            var hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(input.Password);
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
            if (exitingUser != null && BCrypt.Net.BCrypt.EnhancedVerify(input.Password,exitingUser.Password))
            {

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, exitingUser.Login),
                    new Claim(ClaimTypes.NameIdentifier, exitingUser.Id.ToString())
                };


                var token = _tokenService.GenerateAccessToken(claims);
                var refreshToken = _tokenService.GenerateRefreshToken();

                exitingUser.RefreshToken = refreshToken;
                exitingUser.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
                await _context.SaveChangesAsync();

                return Ok(new AuthResponse(true, "Logged in", token,refreshToken));
            }

            return Unauthorized(new AuthResponse(false,"Login or Password are incorrect"));
        }

        [HttpPost("token")]
        public  async Task<ActionResult> RefreshToken([FromBody] TokenRequest input) {
            
            string accessToken = input.AccessToken;
            string refreshToken = input.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name;

            var user = await _context.Users.FirstOrDefaultAsync(u=> u.Login == username);

            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now) {
                return Unauthorized(new AuthResponse(false, "RefreshToken Expired"));
            }

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            //user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);

            _context.SaveChanges();

            return Ok(new AuthResponse(true,"New token Generated",newAccessToken,refreshToken));
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Revoke()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!long.TryParse(userIdString, out var userId))
                return Unauthorized("Błędny identyfikator użytkownika.");

            var user = await _context.Users.FindAsync(userId);

            if(user is null)
            {
                return BadRequest(new AuthResponse(false,"Błędny Login"));
            }

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = DateTime.Now;
            _context.SaveChanges();

            return Ok(new AuthResponse(true,"Logout"));
        }
    }
}
