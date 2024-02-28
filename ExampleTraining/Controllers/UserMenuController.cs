using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Implements;

namespace WebExampleTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserMenuController : Controller
    {
        private readonly IUserMenuService _userMenuService;

        public UserMenuController(IUserMenuService userMenuService)
        {
            _userMenuService = userMenuService;
        }

        [HttpGet]
        [Route("GetPermission/{userId}")]
        public IActionResult GetPermission(int userId)
        {
            var query = _userMenuService.GetPermission(userId);
            return Ok(query);
        }

        [HttpPost]
        [Route("InsertPermission")]
        public IActionResult InsertPermission(InsertPermissionParam param)
        {
            _userMenuService.InsertPermission(param);
            return Ok();
        }
    }
}
