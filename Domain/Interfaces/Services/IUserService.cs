using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IUserService
    {
        public UserViewModel LoginUser(string username, string password);

        List<UserViewModel> QueryAllUser();
        void CreateUser (CreateUserParam param);
        void ChangePassword(ChangePasswordParam param);
        void DeleteUser(int id);
        void UpdateUser(UpdateUserParam param);
    }
}
