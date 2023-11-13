using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;
using Infrastructure.Interfaces;

namespace Core.Handlers.Blogs
{
    public class GetBlogsHandler : Ihandle<User, ResponseModel<IPagination<BlogDto>>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly BlogParams _data;
        public GetBlogsHandler(User user, IUnitOfWork unitOfWork, BlogParams data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _data = data;
        }
        public async Task<ResponseModel<IPagination<BlogDto>>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _unitOfWork.BlogRepository.GetAllBlogs(_data);
            return ResponseModel<IPagination<BlogDto>>.SuccessResponse(response);
        }
        public async Task<ResponseModel<IPagination<BlogDto>>> ValidateAsync()
        {
            if (_user == null)
                return await ResponseModel<IPagination<BlogDto>>.AccessDeniedResponseAsync();
            return await ResponseModel<IPagination<BlogDto>>.SuccessResponseAsync();
        }
    }
}