using Domain.Errors;
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
    public class UserMenuService : IUserMenuService
    {
        public readonly ExamsContext _context;

        public UserMenuService(ExamsContext examsContext)
        {
            _context = examsContext;
        }

        public List<UserMenuViewModel> GetPermission(int userId)
        {
            var userMenu = _context.UserMenu
                .Where(x => x.UserId == userId)
                .Select(x => new UserMenuViewModel()
                {
                    MenuName = x.Menu.MenuName,
                    UserId = x.UserId,
                    MenuId = x.MenuId,
                    Permission = x.Permission,
                    IsAllow = x.Permission != ""
                }).ToList();

            return userMenu;
        }

        public void InsertPermission(InsertPermissionParam param)
        {
            var permission = _context.UserMenu.Where(x => x.UserId == param.UserId && x.MenuId == param.MenuId).FirstOrDefault();

            var error = new CustomError();
            if (permission == null)
            {
                error.AddError("Error");
            }
            error.ThrowIfError();

            if (param.IsAllow == true)
            {
                
                permission.Permission = param.Permission;
            }
            else
            {
                
                permission.Permission = param.Permission;
            }
            _context.SaveChanges();
        }
    }
}
