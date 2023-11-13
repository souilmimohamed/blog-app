using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.Handlers.Users
{
    public class LoginUserHandler : Ihandle<User, ResponseModel<LoginResponseDto>>
    {
        private readonly User _user;
        private readonly LoginDto _data;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        public LoginUserHandler(User user, LoginDto data, IUnitOfWork unitOfWork, ITokenService tokenService)
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

            var user = await _unitOfWork.UserRepository.GetUserByEmail(_data.Email);
            var passwordMatch = VerifyPassword(user, _data.Password);
            if (!passwordMatch)
                return ResponseModel<LoginResponseDto>.WrongPasswordResponse();

            var response = new LoginResponseDto
            {
                Email = user.Email,
                Name = user.Name,
                Username = user.Username,
                Token = await _tokenService.CreateToken(user),
            };
            return ResponseModel<LoginResponseDto>.SuccessResponse(response);
        }
        public async Task<ResponseModel<LoginResponseDto>> ValidateAsync()
        {
            var user = await _unitOfWork.UserRepository.GetUserByEmail(_data.Email);
            if (user == null)
                return await ResponseModel<LoginResponseDto>.FailureResponseAsync("email incorrect");
            return await ResponseModel<LoginResponseDto>.SuccessResponseAsync();
        }
        private bool VerifyPassword(User user, string password)
        {
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return false;
            }
            return true;
        }
    }
}