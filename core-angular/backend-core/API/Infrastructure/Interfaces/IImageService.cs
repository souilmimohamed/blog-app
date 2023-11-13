using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IImageService
    {
        Task<string> UpdateUserProfileImage(ImageDto image, int userId);
        Task<string> UpdateBlogHeaderImage(ImageDto image);
    }
}