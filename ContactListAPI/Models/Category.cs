using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ContactListAPI.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class CategoryType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<SubCategoryType> SubCategories { get; set; }
    }
}
