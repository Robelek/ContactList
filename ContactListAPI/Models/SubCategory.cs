using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ContactListAPI.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class SubCategoryType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public int CategoryId { get; set; }
        public CategoryType Category { get; set; }
    }
}
