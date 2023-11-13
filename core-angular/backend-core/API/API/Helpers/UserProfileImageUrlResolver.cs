using AutoMapper;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;

namespace API.Helpers
{
    public class UserProfileImageUrlResolver : IValueResolver<User, UserDto, string>
    {
        private readonly IConfiguration _configuration;

        public UserProfileImageUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string Resolve(User source, UserDto destination, string destMember, ResolutionContext context)
        {
            if (source.ProfileImage != null)
            {
                return $"{_configuration["ApiUrl"]}{source.ProfileImage.ImageName}.{source.ProfileImage.ImageExtension}";
            }
            return null;
        }
    }
}
