using ContactListAPI.Models;
using ContactListAPI.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections;

namespace ContactListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MiscController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public MiscController(
            ApplicationDbContext _dbContext
           )
        {
            dbContext = _dbContext;
        }


        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var allCategories = await dbContext.Category.ToListAsync();

                if (allCategories == null)
                {
                    return NotFound("No categories exist");
                }

                var categoryDTOs = new ArrayList();

                foreach (CategoryType cat in allCategories)
                {
                    CategoryDTO categoryDTO = new CategoryDTO();
                    categoryDTO.Name = cat.Name;
                    categoryDTO.Id = cat.Id;

                    categoryDTOs.Add(categoryDTO);
                }

                return Ok(categoryDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("subcategories")]
        public async Task<IActionResult> GetAllSubCategories()
        {
            try
            {
                var allCategories = await dbContext.SubCategory.ToListAsync();

                if (allCategories == null)
                {
                    return NotFound("No categories exist");
                }

                var categoryDTOs = new ArrayList();

                foreach (SubCategoryType cat in allCategories)
                {
                    SubCategoryDTO categoryDTO = new SubCategoryDTO();
                    categoryDTO.Name = cat.Name;
                    categoryDTO.Id = cat.Id;
                    categoryDTO.CategoryId = cat.CategoryId;

                    categoryDTOs.Add(categoryDTO);
                }

                return Ok(categoryDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}
