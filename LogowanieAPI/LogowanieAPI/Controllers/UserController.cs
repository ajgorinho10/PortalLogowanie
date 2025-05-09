using Microsoft.AspNetCore.Mvc;
using LogowanieAPI.Model.DTO;
using LogowanieAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LogowanieAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController(ApplicationDbContext context, IConfiguration configuration) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IConfiguration _configuration = configuration;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get() {

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!long.TryParse(userIdString, out var userId))
                return Unauthorized("Błędny identyfikator użytkownika.");

            var user = await _context.Users.FindAsync(userId);

            if (user != null)
            {
                return Ok(new ApiResponse<UserDTO>(true, "User data", new UserDTO(user)));
            }

            return Unauthorized();
        }
    }
}
