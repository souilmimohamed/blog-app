using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;


namespace Infrastructure.Interfaces
{
    public interface IBlogRepository
    {
        Task<IPagination<BlogDto>> GetAllBlogs(BlogParams blogParams);
        Task<BlogDto> GetBlogById(int id);
        Task<BlogEntry> GetBlog(int id);
        Task<IEnumerable<BlogDto>> GetBlogByUser(int userId);
        Task<BlogDto> AddNewBlog(BlogEntry blog);
        Task<int> DeleteBlog(int id);
        Task<BlogDto> UpdateBlog(BlogEntry blog);
        Task<int> LikeBlog(int blogId);
    }
}
