using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IUserMenuService
    {
        List<UserMenuViewModel> GetPermission(int userId);
        void InsertPermission(InsertPermissionParam param);
    }
}
