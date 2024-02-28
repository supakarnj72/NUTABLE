using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class UserViewModel
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool? IsAdmin { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public string Permission {  get; set; }

    }

    public class CreateUserParam
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class ChangePasswordParam
    {
        public string Username { get; set;}
        public string Password { get; set;}
        public string NewPassword { get; set;}
        public string ConfirmPassword { get; set;}

    }

    public class UpdateUserParam
    {
        public int? UserId { get; set; }
        public string Username { get; set; }
    }

    public class GetPermissionParam
    {
        public int? UserId { get; set; }
        public string MenuUrl { get; set; }
    }

    public class PermissionViewModel
    {
        public string Permission { get; set; }
    }
}
