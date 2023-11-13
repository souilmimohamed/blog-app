using AutoMapper;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;

namespace API.Helpers
{
    public class BlogHeaderImageUrlResolver : IValueResolver<BlogEntry, BlogDto, string>
    {
        private readonly IConfiguration _configuration;

        public BlogHeaderImageUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string Resolve(BlogEntry source, BlogDto destination, string destMember, ResolutionContext context)
        {
            if (source.HeaderImage != null)
            {
                return $"{_configuration["ApiUrl"]}{source.HeaderImage.ImageName}.{source.HeaderImage.ImageExtension}";
            }
            return null;
        }
    }
}
