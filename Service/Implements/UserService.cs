using Domain.Errors;
using Domain.Interfaces.Services;
using Domain.Models;
using Domain.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implements
{
    public class UserService : IUserService
    {
        public readonly ExamsContext _examsContext;

        public UserService(ExamsContext examsContext)
        {
            _examsContext = examsContext;
        }

        public UserViewModel LoginUser(string username, string password)
        {

            CustomError customsError = new CustomError();
            if (string.IsNullOrEmpty(username))
            {
                customsError.AddError("please enter username");
            }

            if (string.IsNullOrEmpty(password))
            {
                customsError.AddError("please enter password");
            }
            customsError.ThrowIfError();


            var userList = _examsContext.Users.ToList();
            Users findUser = null;
            var hashpassword = CreateSHA256(password);

            foreach (var user in userList)
            {
                if (user.Username == username && user.Password == hashpassword)
                {
                    findUser = user;
                }
            }
            if (findUser == null)
            {
                throw new CustomError("Username or Password is wrong");
            }

            UserViewModel userViewModel = new UserViewModel();
            var permission = _examsContext.UserMenu.Where(x => x.UserId == findUser.UserId).ToList();
            userViewModel.UserId = findUser.UserId;


            return userViewModel;
        }

        public string CreateSHA256(string strData)
        {
            var message = Encoding.UTF8.GetBytes(strData);
            using (var alg = SHA256.Create())
            {
                string hex = "";

                var hashValue = alg.ComputeHash(message);
                foreach (byte x in hashValue)
                {
                    hex += String.Format("{0:x2}", x);
                }
                return hex;
            }
        }

        public void CreateUser(CreateUserParam param)
        {
            var error = new CustomError();
            if (string.IsNullOrWhiteSpace(param.Username) || string.IsNullOrWhiteSpace(param.Password))
            {
                error.AddError("Username or Password is requried");
            }
            error.ThrowIfError();

            var users = new Users();

            var hashpassword = CreateSHA256(param.Password);

            users.Username = param.Username;
            users.Password = hashpassword;

            users.IsAdmin = false;

            var currentTime = DateTime.Now;
            users.CreateTime = currentTime;
            users.ModifiedTime = currentTime;

            var maxUserId = _examsContext.Users.Max(x => x.UserId);

            users.UserId = maxUserId + 1;

            var allMenus = _examsContext.Menu.ToList();

            foreach (var menu in allMenus)
            {
                var userMenu = new UserMenu
                {
                    UserId = users.UserId,
                    MenuId = menu.MenuId,
                    Permission = "Read"
                };

                _examsContext.UserMenu.Add(userMenu);
            }

            _examsContext.Users.Add(users);
            _examsContext.SaveChanges();
        }

        public void ChangePassword(ChangePasswordParam param)
        {

            var result = _examsContext.Users.Where(x => x.Username == param.Username)
                                   .FirstOrDefault();

            var error = new CustomError();
            if (result == null)
            {
                error.AddError("User not found.");
            }
            if (string.IsNullOrWhiteSpace(param.Password))
            {
                error.AddError("Password is requried");
            }
            else if (!IsPasswordMatch(param.Username, param.Password))
            {
                error.AddError("Password is incorrect.");
            }
            if (param.NewPassword != param.ConfirmPassword)
            {
                error.AddError("New password and confirm password do not match.");
            }
            error.ThrowIfError();

            var currentTime = DateTime.Now;
            result.ModifiedTime = currentTime;

            result.Password = param.NewPassword;
            _examsContext.SaveChanges();
        }

        private bool IsPasswordMatch(string username, string password)
        {
            var user = _examsContext.Users.FirstOrDefault(x => x.Username == username);
            var hashpassword = CreateSHA256(password);

            if (user != null)
            {
                return user.Password == hashpassword;
            }
            return false;
        }

        public List<UserViewModel> QueryAllUser()
        {

            var Users = _examsContext.Users
                .Select(x => new UserViewModel()
                {
                    UserId = x.UserId,
                    Username = x.Username,
                    Password = x.Password,
                    IsAdmin = x.IsAdmin,
                    CreateTime = x.CreateTime,
                    ModifiedTime = x.ModifiedTime
                }).ToList();

            return Users;
        }

        public void DeleteUser(int id)
        {
            var error = new CustomError();
            if (id <= 0)
            {
                error.AddError("User is invalid.");
            }
            error.ThrowIfError();

            var removeUsers = _examsContext.Users.FirstOrDefault(x => x.UserId == id);

            var removeUserMenu = _examsContext.UserMenu.Where(x => x.UserId == id).ToList();

            if (removeUserMenu != null)
            {
                _examsContext.UserMenu.RemoveRange(removeUserMenu);
            }

            _examsContext.Users.Remove(removeUsers);
            _examsContext.SaveChanges();
        }

        public void UpdateUser(UpdateUserParam param)
        {
            var error = new CustomError();
            if (param.UserId <= 0)
            {
                error.AddError("User is invalid.");
            }
            if (string.IsNullOrWhiteSpace(param.Username))
            {
                error.AddError("Username is requried");
            }
            error.ThrowIfError();

            var updateUser = _examsContext.Users.Where(x => x.UserId == param.UserId).FirstOrDefault();

            var currentTime = DateTime.Now;
            updateUser.ModifiedTime = currentTime;

            updateUser.Username = param.Username;
            _examsContext.SaveChanges();

        }
    }
}
