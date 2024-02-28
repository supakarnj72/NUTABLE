using Domain.Interfaces.Services;
using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implements
{
    public class MenuService : IMenuService
    {
        public readonly ExamsContext _context;

        public MenuService(ExamsContext examsContext)
        {
            _context = examsContext;
        }

        public List<MenuViewModel> QueryAllMenu()
        {
            var menu = _context.Menu
               .Select(x => new MenuViewModel()
               {
                  MenuId = x.MenuId,
                  MenuName = x.MenuName,
                  MenuUrl = x.MenuUrl,
               }).ToList();

            return menu;
        }
    }
}
