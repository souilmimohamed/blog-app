using Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IProfileImageRepository
    {
        Task<Image> AddProfileImage(Image image);
        Task<Image> UpdateProfileImage(Image image);
        Task<int> DeleteProfileImage(int id);
        Task<Image> GetImageByname(string name);
        Task<Image> GetImageByUserId(int id);
        Task<Image> GetImageByBlogId(int id);
    }
}
