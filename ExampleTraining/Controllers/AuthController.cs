using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Service.Implements;

namespace WebExampleTraining.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userservice;
        private readonly IPolicyService _policyService;

        public AuthController(IUserService userService, IPolicyService policyService)
        {
            _userservice = userService;
            _policyService = policyService;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult SomeMethodName(LoginForm param)
        {
            var loginedUser = _userservice.LoginUser(param.UserName, param.Password);
            if (loginedUser != null) 
            { 
                return Ok(loginedUser);
            }
            else
            {
                string megg = "User Not Found!";
                return NotFound(megg);
            }
            
        }


        [HttpPost]
        [Route("Register")]
        public IActionResult Register(RegisterForm param)
        {
            return Ok();
        }

        [HttpGet]
        [Route("GetPolicy")]
        public IEnumerable<string> GetPolicy()
        {
            
            return _policyService.GetLoginPolicy();
        }

        [HttpPost]
        [Route("GetPermission")]
        public IActionResult GetPermission(GetPermissionParam param)
        {
            var permission = _policyService.GetPermission(param);
            return Ok(permission);
        }


    }
}
