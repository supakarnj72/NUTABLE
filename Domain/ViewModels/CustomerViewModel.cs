using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class CustomerViewModel
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public int? Age { get; set; }
        public int OrderCount { get; set; } = 0;
        public int CustomerValue { get; set; } = 0; 
    }

    public class QueryAllCustomerParam
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public DataSourceLoadOptions LoadOptions { get; set; }

    }
}
