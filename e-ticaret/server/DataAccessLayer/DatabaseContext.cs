using EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;


namespace DataAccessLayer
{
    public class DatabaseContext:DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           
           optionsBuilder.UseSqlServer("server=DESKTOP-4GBOEMR; database=WebStaj2; integrated security=true;");
           

        }

        public DbSet<About> Abouts { get; set; }
        //public DbSet<Blog> Blogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<MyAccount> MyAccounts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Offer> Offers { get; set; }

        public DbSet<UsingStatus> UsingStatus { get; set; }


    }
}
