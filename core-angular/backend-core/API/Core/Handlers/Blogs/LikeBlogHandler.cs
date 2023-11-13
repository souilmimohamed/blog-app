using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Handlers.Blogs
{
    public class LikeBlogHandler : Ihandle<User, ResponseModel<int>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly int _data;
        public LikeBlogHandler(User user, IUnitOfWork unitOfWork, int data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _data = data;
        }
        public async Task<ResponseModel<int>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _unitOfWork.BlogRepository.LikeBlog(_data);
            if (!await _unitOfWork.Complete())
                return ResponseModel<int>.FailureResponse("error liking blog");
            return ResponseModel<int>.SuccessResponse(response);
        }
        public async Task<ResponseModel<int>> ValidateAsync()
        {
            if (_user == null)
                return await ResponseModel<int>.AccessDeniedResponseAsync();
            return await ResponseModel<int>.SuccessResponseAsync();
        }
    }
}