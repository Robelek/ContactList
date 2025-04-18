using ContactListAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactListAPI
{
    public class StartupFunctions
    {
        public static async Task SeedAdminAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var existingAdmin = await context.Users.FirstOrDefaultAsync(u => u.Email == "admin@admin.com");
            if (existingAdmin != null) return;

            var category = await context.Category.FirstOrDefaultAsync(c => c.Name == "Work"); // "Work"
            var subCategory = await context.SubCategory.FirstOrDefaultAsync(s => s.Name =="Administrator"); // "Administrator"

            if (category == null || subCategory == null)
            {
                throw new Exception("Category or subcategory not found");
            }
               

            var adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");
            var passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(adminPassword);

            var admin = new ContactData
            {
                ID = Guid.NewGuid(),
                FirstName = "System",
                LastName = "Administrator",
                Email = "admin@admin.com",
                PasswordHash = passwordHash,
                CategoryId = category.Id,
                SubCategoryID = subCategory.Id,
                Category = category,
                SubCategory = subCategory,
                PhoneNumber = "000-000-0000",
                DateOfBirth = new DateTime(1990, 1, 1),
                UserRole = Role.Admin
            };

            context.Users.Add(admin);
            await context.SaveChangesAsync();
        }
    }
   

}
