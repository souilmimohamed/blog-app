using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using Slugify;

namespace Core.Handlers.Blogs
{
    public class AddBlogHandler : Ihandle<User, ResponseModel<BlogDto>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly BlogDto _data;
        public AddBlogHandler(User user, IUnitOfWork unitOfWork, BlogDto data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _data = data;
        }
        public async Task<ResponseModel<BlogDto>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;
            SlugHelper helper = new SlugHelper();
            var blog = new BlogEntry
            {
                Body = _data.Body,
                CreatedAt = DateTime.UtcNow,
                Description = _data.Description,
                Slug = helper.GenerateSlug(_data.Title),
                Title = _data.Title,
                PublisherId = _user.Id
            };
            var response = await _unitOfWork.BlogRepository.AddNewBlog(blog);

            return ResponseModel<BlogDto>.SuccessResponse(response);
        }
        public async Task<ResponseModel<BlogDto>> ValidateAsync()
        {
            if (_user == null)
                return await ResponseModel<BlogDto>.AccessDeniedResponseAsync();
            return await ResponseModel<BlogDto>.SuccessResponseAsync();
        }
    }
}