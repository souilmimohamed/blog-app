using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Infrastructure.Data.Repos
{
    public class BlogRepository : IBlogRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BlogRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<BlogDto> AddNewBlog(BlogEntry blog)
        {
             _context.Blogs.Add(blog);
             _context.SaveChanges();
            return _mapper.Map<BlogDto>(blog);
        }
        public async Task<int> DeleteBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            _context.Blogs.Remove(blog);
            return id;
        }
        public async Task<IPagination<BlogDto>> GetAllBlogs(BlogParams blogParams)
        {
            var query = _context.Blogs
                .Include(b => b.Publisher)
                .Include(b => b.HeaderImage)
                .AsQueryable();

            if (!blogParams.SearchText.StringIsNullOrEmptyOrWhiteSpaces())
                query = query.Where(b => b.Title.ToLower().Contains(blogParams.SearchText.ToLower()));
            if (!blogParams.Publisher.StringIsNullOrEmptyOrWhiteSpaces())
                query = query.Where(b => b.Publisher.Name.ToLower().Contains(blogParams.Publisher.ToLower()));

            query = blogParams.SortDate switch
            {
                "DESC" => query.OrderByDescending(b => b.PublishedDate),
                "ASC" => query.OrderBy(b => b.PublishedDate),
                _ => query,
            };
            var items = _mapper.Map<IEnumerable<BlogDto>>(await query.ToListAsync());
            return IPagination<BlogDto>.GetPagination(
                items,
                blogParams.PageNumber,
                blogParams.PageSize);
        }
        public async Task<BlogEntry> GetBlog(int id)
        {
            return await _context.Blogs.FindAsync(id);
        }
        public async Task<BlogDto> GetBlogById(int id)
        {
            var blog = await _context.Blogs
                .Include(b => b.HeaderImage)
                .Include(b => b.Publisher)
                .FirstOrDefaultAsync(b => b.Id == id);
            return _mapper.Map<BlogDto>(blog);
        }

        public async Task<IEnumerable<BlogDto>> GetBlogByUser(int userId)
        {
            var query = _context.Blogs
               .Include(b => b.Publisher)
               .Include(b => b.HeaderImage)
               .Where(b => b.Publisher.Id == userId).AsQueryable();
            return _mapper.Map<IEnumerable<BlogDto>>(await query.ToListAsync());
        }

        public async Task<int> LikeBlog(int blogId)
        {
            var blog = await _context.Blogs.FindAsync(blogId);
            blog.Likes++;
            _context.Blogs.Update(blog);
            return blog.Likes;
        }
        public async Task<BlogDto> UpdateBlog(BlogEntry blog)
        {
            _context.Blogs.Update(blog);
            return _mapper.Map<BlogDto>(blog);
        }
    }
}