using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class UpdateProductParam
    {
        public int ProductID { get; set;}
        public string Name { get; set;}
        public int Price { get; set;}
    }
}
