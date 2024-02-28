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
    public class PolicyService : IPolicyService
    {
        private readonly ExamsContext _context;

        public PolicyService(ExamsContext context)
        {
            _context = context;
        }
        public List<string> GetLoginPolicy()
        {
            return new List<string>()
            {
                "Username cannot empty",
                "Password cannot empty",
                "text must be english only",
                "Cannot use space character both field username & password",
            };
        }

        public PermissionViewModel GetPermission(GetPermissionParam param)
        {
            var model = new PermissionViewModel();

            var menuId = _context.Menu.Where(x => x.MenuUrl == param.MenuUrl)
                                            .Select(x => x.MenuId).FirstOrDefault();
            var permission = _context.UserMenu.Where(x => x.UserId == param.UserId && x.MenuId == menuId)
                .Select( x => x.Permission ).FirstOrDefault();

            model.Permission = permission;

            return model;
        }
    }
}
