﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public partial class USP_Query_CustomerResult
    {
        public int? CustomerID { get; set; }
        public string Name { get; set; }
        public int? Age { get; set; }
        public int? OrderCount { get; set; }
        public int? CustomerValue { get; set; }
        public string OrderStatus { get; set; }
        public int? TotalCount { get; set; }
    }
}