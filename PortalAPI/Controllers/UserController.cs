using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PortalAPI.Data;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace PortalAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public UserController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var data = await _context.Users.ToListAsync();

            return Ok(new ApiResponse<List<PortalAPI.Data.User>>(true, "", data));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return Ok(new ApiResponse<User>(false, "Nie znaleziono użytkownika", null));
            return Ok(new ApiResponse<User>(true, "Znaleziono użytkownika", user));
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Login == user.Login);
                if (existingUser != null)
                {
                    return Ok(new ApiResponse<User>(false, "Podany Login już istnieje", null));
                }

                if(!PassCheck.isPassValid(user.Password))
                {
                    return Ok(new ApiResponse<User>(false, "Nie prawidłowe hasło", null));
                }

                if (!PassCheck.isLoginValid(user.Login))
                {
                    return Ok(new ApiResponse<User>(false, "Nie prawidłowy login", null));
                }

                user.Password = PassCheck.HashAndSalt(user.Password);

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<User>(true, "Stworzono użytkownika", user));
            }
            catch (DbUpdateException ex) {
                if (ex.InnerException is SqlException sqlException &&
            sqlException.Number == 2627)
                {
                    return Ok(new ApiResponse<User>(false, "Podany Login już istnieje", null));
                }

                return StatusCode(500, "An error occurred while processing your request.");
            }   
        }

        [HttpPost("/[controller]/login")] 
        public async Task<ActionResult<String>> loggin(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Login == user.Login);
            if (existingUser == null)
            {
                return Ok(new ApiResponse<String>(false, "Błędny login lub hasło", null));
            }
            else
            {
                if(PassCheck.VerifyPassword(user.Password, existingUser.Password))
                {
                    var token = Token.GenerateToken(user,_config);
                    return Ok(new ApiResponse<String>(true, "Zalogowano", token));
                }
                else
                {
                    return Ok(new ApiResponse<String>(false, "Błędny login lub hasło", null));
                }
            }


        }

    }
}
