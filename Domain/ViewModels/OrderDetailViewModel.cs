using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class OrderDetailViewModel
    {
        public string ProductName { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }

    }

    public class UpdateOrderDetailParam
    {
        public int ProductId { get; set; }
        public int? Quantity { get; set; }

    }

    public class DeleteOrderDetailParam
    {
        public int ProductId { get; set; }
        public string OrderId { get; set; }

    }

    public class DeleteOrderDetailViewModel
    {
        public bool IsRefresh { get; set; }
        public string Message { get; set; }
    }

    public class UpdateOrderDetailViewModel
    {
        public bool IsRefresh { get; set; }
        public string Message { get; set; }
    }
}
