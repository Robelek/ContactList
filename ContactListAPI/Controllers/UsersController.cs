using ContactListAPI.Models;
using ContactListAPI.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using System.Collections;
using Microsoft.AspNetCore.Authorization;

namespace ContactListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IConfiguration configuration;
        private readonly ILogger<UsersController> logger;
        private readonly JwtSettings jwtSettings;
        public UsersController(
            ApplicationDbContext _dbContext, 
            IConfiguration _configuration,
            ILogger<UsersController> _logger,
            JwtSettings _jwtSettings)
        {
            dbContext = _dbContext;
            configuration = _configuration;
            logger = _logger;
            jwtSettings = _jwtSettings;
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

                var category = await dbContext.Category.FirstOrDefaultAsync(cat => cat.Name == contactDataDTO.Category);

                if (category == null)
                {
                    
                    category = new CategoryType
                    {
                        Name = contactDataDTO.Category
                    };
                    dbContext.Category.Add(category);
                    await dbContext.SaveChangesAsync();  
                }

               
                var subCategory = await dbContext.SubCategory.FirstOrDefaultAsync(sub => sub.Name == contactDataDTO.SubCategory);

                if (subCategory == null)
                {
                    
                    subCategory = new SubCategoryType
                    {
                        Name = contactDataDTO.SubCategory,
                        CategoryId = category.Id     
                    };
                    dbContext.SubCategory.Add(subCategory);
                    await dbContext.SaveChangesAsync();
                }

                var newUser = new ContactData
                {
                    ID = Guid.NewGuid(),
                    FirstName = contactDataDTO.FirstName,
                    LastName = contactDataDTO.LastName,
                    Email = contactDataDTO.Email,
                    PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(contactDataDTO.Password),
                    Category = category,
                    SubCategory = subCategory,
                    PhoneNumber = contactDataDTO.PhoneNumber,
                    DateOfBirth = contactDataDTO.DateOfBirth,
                    UserRole = Role.User,
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

                var userDataDtos = new ArrayList();

                foreach(ContactData user in allUsers)
                {
                    userDataDtos.Add(user.toContactDataBriefDTO());
                }

                return Ok(userDataDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByID(Guid id, [FromQuery] bool? forEdit)
        {
            
            try
            {

                if(forEdit == true)
                {
                    var userID = User.FindFirst("id")?.Value;
                    var userRoleFromClaim = User.FindFirst("role")?.Value;

                    if (!id.ToString().Equals(userID))
                    {
                        logger.LogWarning("Access attempt without rights, ids: {0} {1}", userID, id.ToString());
                        if (!userRoleFromClaim.Equals("Admin"))
                        {
                            return Unauthorized("You don't have rights to access this");
                        }
                    }
                }


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

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserByID(Guid id)
        {
 
            try
            {
                var userID = User.FindFirst("id")?.Value;
                var userRoleFromClaim = User.FindFirst("role")?.Value;

                if (!id.ToString().Equals(userID))
                {
                    logger.LogWarning("Access attempt without rights, ids: {0} {1}", userID, id.ToString());
                    if (!userRoleFromClaim.Equals("Admin"))
                    {
                        return Unauthorized("You don't have rights to access this");
                    }
                }

                var thatUser = await dbContext.Users.FindAsync(id);

                if (thatUser == null)
                {
                    return NotFound("User with that ID doesn't exist");
                }

                dbContext.Users.Remove(thatUser);
                await dbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
           
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserByID(Guid id, [FromBody] ContactDataRegisterDTO updatedUser)
        {

            try
            {

                var userID = User.FindFirst("id")?.Value;
                var userRoleFromClaim = User.FindFirst("role")?.Value;

                if (!id.ToString().Equals(userID))
                {
                    logger.LogWarning("Access attempt without rights, ids: {0} {1}", userID, id.ToString());
                    if (!userRoleFromClaim.Equals("Admin"))
                    {
                        return Unauthorized("You don't have rights to access this");
                    }
                }

                var thatUser = await dbContext.Users.FindAsync(id);

                if (thatUser == null)
                {
                    return NotFound("User with that ID doesn't exist");
                }

                var category = await dbContext.Category.FirstOrDefaultAsync(cat => cat.Name == updatedUser.Category);

                if (category == null)
                {

                    category = new CategoryType
                    {
                        Name = updatedUser.Category
                    };
                    dbContext.Category.Add(category);
                    await dbContext.SaveChangesAsync();
                }


                var subCategory = await dbContext.SubCategory.FirstOrDefaultAsync(sub => sub.Name == updatedUser.SubCategory);

                if (subCategory == null)
                {

                    subCategory = new SubCategoryType
                    {
                        Name = updatedUser.SubCategory,
                        CategoryId = category.Id
                    };
                    dbContext.SubCategory.Add(subCategory);
                    await dbContext.SaveChangesAsync();
                }


                thatUser.updateFieldsToMatchDTO(updatedUser, category, subCategory);
               
                thatUser.ID = id;
                thatUser.PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(updatedUser.Password);


                await dbContext.SaveChangesAsync();

                return Ok(thatUser.toContactDataDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDTO loginDTO)
        {
            try
            {
                //logger.LogInformation(loginDTO.Email);
                var userData = await dbContext.Users.FirstAsync(user => user.Email == loginDTO.Email);

                if(userData == null)
                {
                    return NotFound("No user with that email");
                }

                var isPasswordCorrect = BCrypt.Net.BCrypt.EnhancedVerify(loginDTO.Password, userData.PasswordHash);
                if (!isPasswordCorrect)
                {
                    return Unauthorized("Wrong password");
                }


                var token = GenerateJWTToken(userData.ID, ((Role)userData.UserRole).ToString());

                return Ok(new { token = token });

            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private string GenerateJWTToken(Guid id, string role)
        {
            

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", id.ToString()),
                new Claim("role", role)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds


                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        
    }
}
