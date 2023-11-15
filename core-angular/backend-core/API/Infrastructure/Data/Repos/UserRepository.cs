using AutoMapper;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Data.Repos
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<UserDto>> GetAllUsers()
        {
            var query = _context.Users
            .Include(u => u.ProfileImage).AsQueryable();
            var users= _mapper.Map<IEnumerable<UserDto>>(await query.ToListAsync());
            foreach (var user in users)
            {
                var blogsQuery=_context.Blogs
                    .Include(b => b.Publisher)
               .Include(b => b.HeaderImage)
               .Where(b => b.Publisher.Id == user.Id).AsQueryable();

                user.Blogs=_mapper.Map<IEnumerable<BlogDto>>(await blogsQuery.ToListAsync());
            }
            return users;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> RegisterUser(User user)
        {
            await _context.Users.AddAsync(user);
            return user;
        }

        public async Task<UserDto> UpdateUser(User user)
        {
            _context.Users.Update(user);
            return _mapper.Map<UserDto>(user);
        }
    }
}
