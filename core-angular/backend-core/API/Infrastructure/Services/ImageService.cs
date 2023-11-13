using Infrastructure.Data;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;
using Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;


namespace Infrastructure.Services
{
    public class ImageService : IImageService
    {

        private readonly string _imagePath;
        private readonly IUnitOfWork _unitOfWork;

        public ImageService(IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            _imagePath = configuration["imagesFolder"];
            _unitOfWork = unitOfWork;
        }

        public async Task<string> UpdateBlogHeaderImage(ImageDto image)
        {
            var _image = await _unitOfWork.ProfileImageRepository.GetImageByBlogId(image.BlogId ?? -1);
            var blog = await _unitOfWork.BlogRepository.GetBlog(image.BlogId ?? -1);
            if (_image != null)
            {
                File.Delete(Path.Combine(_imagePath, $"{_image.ImageName}.{_image.ImageExtension}"));
                await _unitOfWork.ProfileImageRepository.DeleteProfileImage(_image.Id);
                await _unitOfWork.Complete();
            }
            var newName = await GetSafeImageName();
            var imageModel = image.ToBuisnessModel();
            await File.WriteAllBytesAsync(Path.Combine(_imagePath, $"{newName}.{imageModel.ImageFileExtension}"), imageModel.ImageFile);
            var imageToSave = new Image
            {
                ImageExtension = image.ImageFileExtension,
                ImageName = newName,
                BlogEntryHeaderImageId = image.BlogId ?? -1
            };
            var addedImage = await _unitOfWork.ProfileImageRepository.AddProfileImage(imageToSave);
            blog.HeaderImageId = addedImage.Id;
            await _unitOfWork.BlogRepository.UpdateBlog(blog);
            await _unitOfWork.Complete();
            return newName;
        }

        public async Task<string> UpdateUserProfileImage(ImageDto image, int userId)
        {
            var _image = await _unitOfWork.ProfileImageRepository.GetImageByUserId(userId);
            var user = await _unitOfWork.UserRepository.GetUserById(userId);
            if (_image != null)
            {
                File.Delete(Path.Combine(_imagePath, $"{_image.ImageName}.{_image.ImageExtension}"));
                await _unitOfWork.ProfileImageRepository.DeleteProfileImage(_image.Id);
                await _unitOfWork.Complete();
            }
            var newName = await GetSafeImageName();
            var imageModel = image.ToBuisnessModel();
            await File.WriteAllBytesAsync(Path.Combine(_imagePath, $"{newName}.{imageModel.ImageFileExtension}"), imageModel.ImageFile);
            var imageToSave = new Image
            {
                ImageExtension = image.ImageFileExtension,
                ImageName = newName,
                UserProfileImageId = userId
            };
            var addedImage = await _unitOfWork.ProfileImageRepository.AddProfileImage(imageToSave);
            user.ProfileImageId = addedImage.Id;
            await _unitOfWork.UserRepository.UpdateUser(user);
            await _unitOfWork.Complete();
            return newName;
        }

        private async Task<string> GetSafeImageName()
        {
            var newName = RandomStringGenerator.Generate(50);
            var exsist = await _unitOfWork.ProfileImageRepository.GetImageByname(newName);
            if (exsist != null)
                GetSafeImageName();
            return newName;
        }
    }
}
