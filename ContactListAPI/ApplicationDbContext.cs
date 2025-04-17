using ContactListAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactListAPI
{
   

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<ContactData> Users { get; set; }
        public DbSet<CategoryType> Category { get; set; }
        public DbSet<SubCategoryType> SubCategory { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ContactData>()
            .HasOne(c => c.Category)
            .WithMany()
            .HasForeignKey(c => c.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ContactData>()
                .HasOne(c => c.SubCategory)
                .WithMany()
                .HasForeignKey(c => c.SubCategoryID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CategoryType>().HasData(
                new CategoryType { Id = 1, Name = "Work" },
                new CategoryType { Id = 2, Name = "Private" },
                new CategoryType { Id = 3, Name = "Other" }
            );

  
            modelBuilder.Entity<SubCategoryType>().HasData(
                new SubCategoryType { Id = 1, Name = "Boss", CategoryId = 1 },
                new SubCategoryType { Id = 2, Name = "Client", CategoryId = 1 },
                new SubCategoryType { Id = 3, Name = "Administrator", CategoryId = 1 },
                new SubCategoryType { Id = 4, Name = "HR", CategoryId = 1 },
                new SubCategoryType { Id = 5, Name = "Developer", CategoryId = 1 },
                new SubCategoryType { Id = 6, Name = "Manager", CategoryId = 1 },
                new SubCategoryType { Id = 7, Name = "Intern", CategoryId = 1 },
                new SubCategoryType { Id = 8, Name = "Support", CategoryId = 1 }
            );
        }
    }
}
