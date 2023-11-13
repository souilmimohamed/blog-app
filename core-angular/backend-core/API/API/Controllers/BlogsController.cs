using API.Extensions;
using Core.Common;
using Infrastructure.DTOs;
using Infrastructure.Helpers;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
    [Area("UserBlogs")]
    [Route("api/[area]/[controller]/[action]")]
    [ApiController]
    public class BlogsController : Controller
    {
        private const string MODULE = "Blogs";
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IImageService _imageService;

        public BlogsController(IUnitOfWork unitOfWork, ITokenService tokenService, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _imageService = imageService;
        }

        [Authorize]
        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<BlogDto>), 200)]
        public async Task<ActionResult<ResponseModel<BlogDto>>> AddBlog(BlogDto data)
        {
            try
            {
                var response = await new Core.Handlers.Blogs.AddBlogHandler(await _tokenService.getLoggedInUser(User.GetUserId()), _unitOfWork, data)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<IPagination<BlogDto>>), 200)]
        public async Task<ActionResult<ResponseModel<IPagination<BlogDto>>>> GetBlogs(BlogParams data)
        {
            try
            {
                var response = await new Core.Handlers.Blogs.GetBlogsHandler(await _tokenService.getLoggedInUser(User.GetUserId()), _unitOfWork, data)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<string>), 200)]
        public async Task<ActionResult<ResponseModel<string>>> UpdateBlogHeaderImage([FromForm] ImageDto data)
        {
            try
            {
                var response = await new Core.Handlers.Blogs.UpdateBlogHeaderImageHandler(await _tokenService.getLoggedInUser(User.GetUserId()), _imageService, data)
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
        [ProducesResponseType(typeof(ResponseModel<BlogDto>), 200)]
        public async Task<ActionResult<ResponseModel<BlogDto>>> GetBlogById(int id)
        {
            try
            {
                var response = await new Core.Handlers.Blogs.GetBlogByIdHandler(await _tokenService.getLoggedInUser(User.GetUserId()), _unitOfWork, id)
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
        [ProducesResponseType(typeof(ResponseModel<int>), 200)]
        public async Task<ActionResult<ResponseModel<int>>> LikeBlog(int id)
        {
            try
            {
                var response = await new Core.Handlers.Blogs.LikeBlogHandler(await _tokenService.getLoggedInUser(User.GetUserId()), _unitOfWork, id)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}