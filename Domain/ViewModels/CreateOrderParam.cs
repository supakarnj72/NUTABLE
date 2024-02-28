using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class CreateOrderParam
    {
        public int? CustomerId { get; set; }
        public DateTime? OrderDate { get; set; }
        //public int OrderNumber { get; set; }
        public List<CreateOrderDetail> OrderDetails {  get; set; }

    }

    public class CreateOrderDetail
    {
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }

    }

    public class UpdateOrderParam
    {
        public string OrderID { get; set; }
        public DateTime OrderDate { get; set; }

    }

}
