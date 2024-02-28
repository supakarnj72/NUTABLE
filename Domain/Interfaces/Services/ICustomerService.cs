using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface ICustomerService
    {
        void CreateCustomer(CreateCustomerParam createCustomerParam);
        CustomerViewModel GetCustomer(int? id);
        Task<LoadResult> QueryAllCustomer(QueryAllCustomerParam param);
        void UpdateCustomer(CustomerViewModel param);
        void DeleteCustomer(int param);
    }
}
