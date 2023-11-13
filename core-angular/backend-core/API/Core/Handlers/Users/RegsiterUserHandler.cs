using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using Infrastructure.Services;
using System.Security.Cryptography;
using System.Text;

namespace Core.Handlers.Users
{
    public class RegsiterUserHandler : Ihandle<User, ResponseModel<LoginResponseDto>>
    {
        private readonly User _user;
        private readonly RegisterDto _data;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        public RegsiterUserHandler(User user, RegisterDto data, IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _user = user;
            _data = data;
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
        }
        public async Task<ResponseModel<LoginResponseDto>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var hmac = new HMACSHA512();
            var user = new User
            {
                Name = _data.Name,
                Username = _data.Username,
                Email = _data.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(_data.Password)),
                PasswordSalt = hmac.Key,
            };
            var registredUser = await _unitOfWork.UserRepository.RegisterUser(user);
            if (!await _unitOfWork.Complete())
                return ResponseModel<LoginResponseDto>.FailureResponse("Error registering user");
            var response = new LoginResponseDto
            {
                Email = registredUser.Email,
                Name = registredUser.Name,
                Username = registredUser.Username,
                Token = await _tokenService.CreateToken(registredUser),
            };
            return ResponseModel<LoginResponseDto>.SuccessResponse(response);
        }
        public async Task<ResponseModel<LoginResponseDto>> ValidateAsync()
        {
            var emailExsist = await _unitOfWork.UserRepository.GetUserByEmail(_data.Email);
            if (emailExsist != null)
                return await ResponseModel<LoginResponseDto>.FailureResponseAsync("Email already in use.");
            return await ResponseModel<LoginResponseDto>.SuccessResponseAsync();
        }
    }
}