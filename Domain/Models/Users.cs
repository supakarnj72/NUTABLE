﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public partial class Users
    {
        public Users()
        {
            UserMenu = new HashSet<UserMenu>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool? IsAdmin { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? ModifiedTime { get; set; }

        public virtual ICollection<UserMenu> UserMenu { get; set; }
    }
}