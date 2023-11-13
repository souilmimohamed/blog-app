using Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<BlogEntry> Blogs { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BlogEntry>()
                .HasOne(b => b.Publisher)
                .WithMany()
                .HasForeignKey(b => b.PublisherId);

            modelBuilder.Entity<Image>(e =>
            {
                e.HasOne(x => x.ImageProfileUser)
                .WithOne(x => x.ProfileImage)
                .HasForeignKey<User>(x => x.ProfileImageId)
                .IsRequired(false);

                e.HasOne(x => x.ImageHeaderBlog)
                .WithOne(x => x.HeaderImage)
                .HasForeignKey<BlogEntry>(x => x.HeaderImageId)
                .IsRequired(false);
            });
        }
    }
}
