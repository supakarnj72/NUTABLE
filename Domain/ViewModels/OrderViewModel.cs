using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class OrderViewModel


    {

        public OrderViewModel(Models.Orders x)
        {
            var total = x.OrderDetails.Sum(o => o.Product.Price * o.Quantity).GetValueOrDefault(0);

        }
        public OrderViewModel() { }
        public string OrderId { get; set; }

        public DateTime? DateTime { get; set; }

        public int? TotalPrice { get; set; }

        public int OrderDetails { get; set; }
    }
}
