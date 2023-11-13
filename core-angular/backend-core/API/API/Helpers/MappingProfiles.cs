using AutoMapper;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>()
                .ForMember(u => u.ProfileImageUrl, us => us.MapFrom<UserProfileImageUrlResolver>());
            CreateMap<BlogEntry, BlogDto>()
                .ForMember(u => u.Publisher, bl => bl.MapFrom(b => b.Publisher.Name))
                .ForMember(u => u.HeaderImageUrl, us => us.MapFrom<BlogHeaderImageUrlResolver>());
        }
    }
}
