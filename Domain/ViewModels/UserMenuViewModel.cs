using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class UserMenuViewModel
    {
        public int UserId { get; set; }
        public int MenuId { get; set; }
        public string Permission {  get; set; }
        public string MenuName { get; set; }
        public bool IsAllow { get; set; }
    }

    public class InsertPermissionParam
    {
        public int UserId { get; set; }
        public int MenuId { get; set; }
        public string Permission { get; set; }
        public bool IsAllow {  get; set; }
    }
}
