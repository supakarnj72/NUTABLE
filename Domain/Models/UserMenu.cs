﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public partial class UserMenu
    {
        public int UserId { get; set; }
        public int MenuId { get; set; }
        public string Permission { get; set; }

        public virtual Menu Menu { get; set; }
        public virtual Users User { get; set; }
    }
}