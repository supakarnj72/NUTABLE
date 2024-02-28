using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IOrderService
    {
        List<OrderViewModel> QueryAllOrders(int? customerId);

        void CreateOrder(CreateOrderParam createOrderParam);

        void UpdateOrder(UpdateOrderParam updateOrderParam);

        void DeleteOrder(string param);
    }
}
