using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;

namespace Core.Handlers.Blogs
{
    public class UpdateBlogHeaderImageHandler : Ihandle<User, ResponseModel<string>>
    {
        private readonly User _user;
        private readonly IImageService _imageService;
        private readonly ImageDto _data;
        public UpdateBlogHeaderImageHandler(User user, IImageService imageService, ImageDto data)
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

            var response = await _imageService.UpdateBlogHeaderImage(_data);
            return ResponseModel<string>.SuccessResponse(response);
        }
        public async Task<ResponseModel<string>> ValidateAsync()
        {
            if (_user == null)
                return await ResponseModel<string>.AccessDeniedResponseAsync();
            return await ResponseModel<string>.SuccessResponseAsync();
        }
    }
}
