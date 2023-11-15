using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
namespace Core.Handlers.Users
{
    public class GetAllUsersHandler : Ihandle<User, ResponseModel<IEnumerable<UserDto>>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        public GetAllUsersHandler(User user, IUnitOfWork unitOfWork)
        {
            _user = user;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel<IEnumerable<UserDto>>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _unitOfWork.UserRepository.GetAllUsers();
            return ResponseModel<IEnumerable<UserDto>>.SuccessResponse(response);
        }
        public async Task<ResponseModel<IEnumerable<UserDto>>> ValidateAsync()
        {
            if (_user == null)
                return await ResponseModel<IEnumerable<UserDto>>.AccessDeniedResponseAsync();
            return await ResponseModel<IEnumerable<UserDto>>.SuccessResponseAsync();
        }
    }
}