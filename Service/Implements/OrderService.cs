using Domain.Errors;
using Domain.Interfaces.Services;
using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implements
{
    public class OrderService : IOrderService
    {
        private readonly ExamsContext _context;

        public OrderService(ExamsContext context)
        {
            _context = context;
        }

        public void CreateOrder(CreateOrderParam createOrderParam)
        {
            Orders order = new Orders();
            order.OrderId = FindMaxOrderId();
            order.CustomerId = createOrderParam.CustomerId;
            order.OrderDate = createOrderParam.OrderDate;

            _context.Orders.Add(order);

            foreach (CreateOrderDetail item in createOrderParam.OrderDetails)
            {
                OrderDetails orderDetails1 = new OrderDetails();
                orderDetails1.ProductId = item.ProductId.GetValueOrDefault();
                orderDetails1.Quantity = item.Quantity;
                orderDetails1.OrderId = order.OrderId;
                _context.OrderDetails.Add(orderDetails1);
            }

            _context.SaveChanges();
        }

        private string FindMaxOrderId()
        {
            var max = -1;

            var orderList = _context.Orders.ToList();
            foreach (var item in orderList)
            {
                try
                {
                    var qText = item.OrderId;
                    var onlyNum = qText.Substring(1);
                    var number = Int32.Parse(onlyNum);

                    if (number > max)
                        max = number;
                }
                catch (Exception)
                {


                }


            }
            max += 1;
            return "Q" + max.ToString("000");
        }

        public List<OrderViewModel> QueryAllOrders(int? customerId)
        {
            var error = new CustomError();

            if (customerId == null)
                error.AddError("Id is invalid");


            var Orders = _context.Orders
                .Where(x => x.CustomerId == customerId)
                .Select(x => new OrderViewModel()
                {
                    OrderId = x.OrderId,
                    DateTime = x.OrderDate,
                    TotalPrice = x.OrderDetails.Sum(o => o.Product.Price * o.Quantity).GetValueOrDefault(0),
                    OrderDetails = x.OrderDetails.Count()
                }).ToList();

            foreach (var order in _context.Orders.Where(x => x.CustomerId == customerId).ToList())
            {
                var totalPrice = order.OrderDetails.Sum(o => o.Product.Price * o.Quantity).GetValueOrDefault(0);
            }

            if (Orders == null)
                error.AddError("Order is invalid");
            error.ThrowIfError();
            return Orders;
        }

        public void UpdateOrder(UpdateOrderParam updateOrderParam)
        {
            var order = _context.Orders.Where(x => x.OrderId == updateOrderParam.OrderID)
                                   .FirstOrDefault();

            var error = new CustomError();
            if (order == null)
            {
                error.AddError("Order Id is invalid");
            }
            error.ThrowIfError();

            order.OrderDate = updateOrderParam.OrderDate;
            _context.SaveChanges();
        }

        public void DeleteOrder(string param)
        {
            var error = new CustomError();
            if ( string.IsNullOrEmpty(param) )
                error.AddError("OrderId is invalid");

            var removeOrder = _context.Orders.FirstOrDefault(x => x.OrderId == param);

            var removeOrderDetails = _context.OrderDetails.Where(x => x.OrderId == param).ToList();

             if (removeOrderDetails != null && removeOrderDetails.Count > 0)
                _context.OrderDetails.RemoveRange(removeOrderDetails);
            _context.Orders.Remove(removeOrder);
            _context.SaveChanges();

        }
    }
}
