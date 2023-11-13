using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;

namespace Core.Handlers.Users
{
    public class UpdateUserProfileImageHandler : Ihandle<User, ResponseModel<string>>
    {
        private readonly User _user;
        private readonly IImageService _imageService;
        private readonly ImageDto _data;
        public UpdateUserProfileImageHandler(User user, IImageService imageService, ImageDto data)
        {
            _user = user;
            _imageService = imageService;
            _data = data;
        }
        public async Task<ResponseModel<string>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _imageService.UpdateUserProfileImage(_data, _user.Id);

            return ResponseModel<string>.SuccessResponse(response);
        }
        public async Task<ResponseModel<string>> ValidateAsync()
        {
            if (_user == null)
                return await ResponseModel<string>.AccessDeniedResponseAsync();
            if (_data.ImageFile == null || _data.ImageFile.Length <= 0)
                return await ResponseModel<string>.FailureResponseAsync("image file empty.");
            return await ResponseModel<string>.SuccessResponseAsync();
        }
    }
}