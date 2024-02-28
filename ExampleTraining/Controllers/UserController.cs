using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service.Implements;

namespace WebExampleTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("QueryAllUser")]
        public IActionResult QueryAllUser()
        {
            var query = _userService.QueryAllUser();
            return Ok(query);
        }


        [HttpPost]
        [Route("CreateUser")]
        public IActionResult CreateUser(CreateUserParam param)
        {
            _userService.CreateUser(param);
            return Ok();
        }

        [HttpPost]
        [Route("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordParam param)
        {
            _userService.ChangePassword(param);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userService.DeleteUser(id);
            return Ok();
        }

        [HttpPost]
        [Route("UpdateUser")]
        public IActionResult UpdateUser(UpdateUserParam param)
        {
            _userService.UpdateUser(param);
            return Ok();
        }
    }
}
