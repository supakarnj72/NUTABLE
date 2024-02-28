using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IOrderDetailService
    {
        DeleteOrderDetailViewModel DeleteOrderDetail(DeleteOrderDetailParam param);
        List<OrderDetailViewModel> QueryAllOrdersDetails(string orderId);
        UpdateOrderDetailViewModel UpdateOrderDetail(UpdateOrderDetailParam updateOrderDetailParam);
    }
}
