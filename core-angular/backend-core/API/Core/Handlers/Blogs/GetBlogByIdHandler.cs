using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Handlers.Blogs
{
    public class GetBlogByIdHandler : Ihandle<User, ResponseModel<BlogDto>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly int _data;
        public GetBlogByIdHandler(User user, IUnitOfWork unitOfWork, int data)
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

            var response = await _unitOfWork.BlogRepository.GetBlogById(_data);
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