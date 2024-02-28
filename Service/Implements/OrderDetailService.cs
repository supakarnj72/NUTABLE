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
    public class OrderDetailService : IOrderDetailService
    {
        private readonly ExamsContext _context;

        public OrderDetailService(ExamsContext context)
        {
            _context = context;
        }

        public DeleteOrderDetailViewModel DeleteOrderDetail(DeleteOrderDetailParam param)
        {
            DeleteOrderDetailViewModel result = new DeleteOrderDetailViewModel();

            var error = new CustomError();
            if (param.ProductId == 0)
                error.AddError("ProductId is invalid");

            var orderId = _context.Orders.Where(x => x.OrderId == param.OrderId).FirstOrDefault();

            var removeOrderDetail = _context.OrderDetails.Where(x => x.ProductId == param.ProductId && x.OrderId == param.OrderId).FirstOrDefault();
  
            _context.OrderDetails.Remove(removeOrderDetail);
            _context.SaveChanges();

            var orderDetail = _context.OrderDetails.Where( x => x.OrderId == param.OrderId).ToList();

            if (orderDetail.Count == 0)
            {
                _context.Orders.Remove(orderId);
                _context.SaveChanges();
                result.IsRefresh = true;
            }
            result.Message = "Delete Complete";
            return result;
        }

        public List<OrderDetailViewModel> QueryAllOrdersDetails(string orderId)
        {
            var error = new CustomError();

            if (orderId == null)
                error.AddError("OrderId cannot be null.");

            var OrderDetails = _context.OrderDetails
                .Where(x => x.OrderId == orderId )
                .Select(x => new OrderDetailViewModel()
                {
                    ProductName = x.Product.Name,
                    ProductId = x.ProductId,
                    Quantity = x.Quantity
                }).ToList();

            error.ThrowIfError();

            return OrderDetails;
        }

        public UpdateOrderDetailViewModel UpdateOrderDetail(UpdateOrderDetailParam updateOrderDetailParam)
        {
            UpdateOrderDetailViewModel result = new UpdateOrderDetailViewModel();

            var orderDetail = _context.OrderDetails.Where(x => x.ProductId == updateOrderDetailParam.ProductId).FirstOrDefault();

            using (var err = new CustomError())
            {
                if (updateOrderDetailParam.ProductId == 0)
                    err.AddError("ProductId is invalid");
            }

            orderDetail.Quantity = updateOrderDetailParam.Quantity;
            _context.SaveChanges(); 
            result.Message = "Update Complete";
            return result;
        }


    }
}
