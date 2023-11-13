using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repos
{
    public class ProfileImageRepository : IProfileImageRepository
    {
        private readonly DataContext _context;

        public ProfileImageRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Image> AddProfileImage(Image image)
        {
            var result = await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<int> DeleteProfileImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            _context.Images.Remove(image);
            return id;
        }

        public async Task<Image> GetImageByBlogId(int id)
        {
            return await _context.Images.FirstOrDefaultAsync(i => i.BlogEntryHeaderImageId == id);
        }

        public async Task<Image> GetImageByname(string name)
        {
            return await _context.Images.FirstOrDefaultAsync(i => i.ImageName == name);
        }

        public async Task<Image> GetImageByUserId(int id)
        {
            return await _context.Images.FirstOrDefaultAsync(i => i.UserProfileImageId == id);
        }

        public async Task<Image> UpdateProfileImage(Image image)
        {
            var _image = await _context.Images.FirstOrDefaultAsync(i => i.UserProfileImageId == image.UserProfileImageId);
            _context.Images.Remove(image);
            _context.AddAsync(image);
            return image;
        }
    }
}
