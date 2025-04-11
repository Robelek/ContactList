using ContactListAPI.Models;
using ContactListAPI.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ContactListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public UsersController(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpPost()]
        public async Task<IActionResult> AddNewUser([FromBody] ContactDataRegisterDTO contactDataDTO)
        {
            try
            {

                var emailAlreadyExists = await dbContext.Users.AnyAsync(user => user.Email == contactDataDTO.Email);
                if (emailAlreadyExists)
                {
                    return BadRequest("This email is already in use.");
                }

                var newUser = new ContactData
                {
                    ID = Guid.NewGuid(),
                    FirstName = contactDataDTO.FirstName,
                    LastName = contactDataDTO.LastName,
                    Email = contactDataDTO.Email,
                    PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(contactDataDTO.Password),
                    Category = contactDataDTO.Category,
                    SubCategory = contactDataDTO.SubCategory,
                    PhoneNumber = contactDataDTO.PhoneNumber,
                    DateOfBirth = contactDataDTO.DateOfBirth,

                };

                await dbContext.Users.AddAsync(newUser);
                await dbContext.SaveChangesAsync();
                return Ok(newUser);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
          

        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var allUsers = await dbContext.Users.ToListAsync();

                if(allUsers == null)
                {
                    return NotFound("No users exist");
                }

                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByID(Guid id)
        {
            try
            {
                var thatUser = await dbContext.Users.FindAsync(id);

                if (thatUser == null)
                {
                    return NotFound("User with that ID doesn't exist");
                }

               


                return Ok(thatUser.toContactDataDTO());

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserByID(Guid id)
        {
 
            try
            {
                var thatUser = await dbContext.Users.FindAsync(id);

                if (thatUser == null)
                {
                    return NotFound("User with that ID doesn't exist");
                }

                dbContext.Remove(thatUser);
                await dbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
           
        }



    }
}
