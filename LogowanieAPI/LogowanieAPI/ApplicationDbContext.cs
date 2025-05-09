using LogowanieAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace LogowanieAPI
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().Property(u => u.Id).ValueGeneratedOnAdd();
        }
        
    }
}
