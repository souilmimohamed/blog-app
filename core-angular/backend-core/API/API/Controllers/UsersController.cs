using API.Extensions;
using Core.Common;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
    [Area("Identity")]
    [Route("api/[area]/[controller]/[action]")]
    [ApiController]
    public class UsersController : Controller
    {
        private const string MODULE = "Users";
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IImageService _imageService;

        public UsersController(IUnitOfWork unitOfWork, ITokenService tokenService, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _imageService = imageService;
        }

        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<UserDto>), 200)]
        public async Task<ActionResult<ResponseModel<UserDto>>> RegisterUser(RegisterDto data)
        {
            try
            {
                var response = await new Core.Handlers.Users.RegsiterUserHandler(new Infrastructure.Data.Entities.User { }, data, _unitOfWork, _tokenService)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<LoginResponseDto>), 200)]
        public async Task<ActionResult<ResponseModel<LoginResponseDto>>> Login(LoginDto data)
        {
            try
            {
                var response = await new Core.Handlers.Users.LoginUserHandler(new Infrastructure.Data.Entities.User { }, data, _unitOfWork, _tokenService)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<ResponseModel<IEnumerable<UserDto>>>), 200)]
        public async Task<ActionResult<ResponseModel<IEnumerable<UserDto>>>> GetAllUsers()
        {
            try
            {
                var response = await new Core.Handlers.Users.GetAllUsersHandler(await _tokenService.getLoggedInUser(User.GetUserId()), _unitOfWork)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [DisableRequestSizeLimit]
        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<string>), 200)]
        public async Task<ActionResult<ResponseModel<string>>> UpdateUserProfileImage([FromForm] ImageDto image)
        {
            try
            {
                var response = await new Core.Handlers.Users.UpdateUserProfileImageHandler(await _tokenService.getLoggedInUser(User.GetUserId()), _imageService,
                    image).HandleAsync();
                return Ok(response);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}