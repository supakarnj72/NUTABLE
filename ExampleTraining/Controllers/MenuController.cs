using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Implements;

namespace WebExampleTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : Controller
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet]
        [Route("QueryAllMenu")]
        public List<MenuViewModel> QueryAllMenu()
        {
            var query = _menuService.QueryAllMenu();
            return query;
        }
    }
}
