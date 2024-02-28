using Domain.Errors;
using Domain.Interfaces.Services;
using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Service.Implements
{
    public class CustomerService : ICustomerService
    {
        private readonly ExamsContext _context;

        public CustomerService(ExamsContext context)
        {
            this._context = context;
        }

        public CustomerViewModel GetCustomer(int? id)
        {
            var customer = _context.Customers
                                    .Where(x => x.CustomerId == id)
                                    .Select(x => new CustomerViewModel()
                                    {
                                        CustomerId = x.CustomerId,
                                        Age = x.Age,
                                        Name = x.Name,
                                        OrderCount = x.Orders.ToList().Count(),

                                    })
                                    .FirstOrDefault();

            if (customer == null)
                throw new CustomError("Cannot find this customer");

            return customer;
        }

        //public List<CustomerViewModel> QueryAllCustomer()
        //{
        //    var listOfUSP = _context.Procedures.USP_Query_CustomerAsync("", "", 0, 20, "", "").Result;
        //    return listOfUSP.Select(x => new CustomerViewModel()
        //    {
        //        Age = x.Age,
        //        CustomerId = x.CustomerID.GetValueOrDefault(),
        //        Name = x.Name,
        //        OrderCount = x.OrderCount.GetValueOrDefault(),
        //    }).ToList();
        //}

        public async Task<LoadResult> QueryAllCustomer(QueryAllCustomerParam param)
        {
            var listOfUSP = await _context.Procedures.USP_Query_CustomerAsync(param.Name, param.Status,
                                                                              param.LoadOptions.Skip, 
                                                                              param.LoadOptions.Take, 
                                                                              param.LoadOptions.SortBy, 
                                                                              param.LoadOptions.SortDirection);
            return listOfUSP.LoadResult();
        }

        private bool isDuplicated(string name)
        {
            return _context.Customers.Where(x => x.Name == name).FirstOrDefault() == null;
        }

        public void CreateCustomer(CreateCustomerParam createCustomerParam)
        {
            var error = new CustomError();
            if ( string.IsNullOrWhiteSpace(createCustomerParam.Name) )
                error.AddError("Name is requried");
            if (createCustomerParam.Age.GetValueOrDefault() <= 0)
                error.AddError("Age is requried");
            error.ThrowIfError();

            var customer = new Customers();
            
            customer.Name = createCustomerParam.Name;
            customer.Age = createCustomerParam.Age;

            var maxCustomerId = _context.Customers.Max(x => x.CustomerId);

            customer.CustomerId = maxCustomerId +1;

            _context.Customers.Add(customer);
            _context.SaveChanges();

        }

        public void UpdateCustomer(CustomerViewModel param)
        {
            var error = new CustomError();
            if (string.IsNullOrWhiteSpace(param.Name))
                error.AddError("Name is requried");
            if (param.Age.GetValueOrDefault() <= 0)
                error.AddError("Age is invalid");
            error.ThrowIfError();

            var customer = _context.Customers.Where(x => x.CustomerId == param.CustomerId)
                                   .FirstOrDefault();

            using (var err = new CustomError())
            {
                if (string.IsNullOrWhiteSpace(param.Name))
                    err.AddError("Please specific Name");

                if (param.Age.GetValueOrDefault() <= 0)
                    err.AddError("Please specific Age");
            }

            customer.Name = param.Name;
            customer.Age = param.Age;
            _context.SaveChanges();
        }


        public void DeleteCustomer(int param)
        {
            var error = new CustomError();

            var removeCustomer = _context.Customers.Where(x => x.CustomerId == param)
                                   .FirstOrDefault();

            var removeOrder = _context.Orders.Where(x => x.CustomerId == param)
                                   .ToList();

            if ( removeOrder.Count > 0 )
                error.AddError("this customer cannot be delete");
            error.ThrowIfError();
            _context.Customers.Remove(removeCustomer);
            _context.SaveChanges();

        }

    }
}
