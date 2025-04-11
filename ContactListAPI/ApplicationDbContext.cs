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
    }
}
