using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Implements;

namespace WebExampleTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Route("QueryAllOrders/{customerId}")]
        public List<OrderViewModel> QueryAllOrders(int? customerId)
        {
            var query = _orderService.QueryAllOrders(customerId);
            return query;
        }

        [HttpPost]
        [Route("CreateOrder")]
        public IActionResult CreateOrder(CreateOrderParam createOrderParam)
        {
            _orderService.CreateOrder(createOrderParam);
            return Ok();
        }

        [HttpPost]
        [Route("UpdateOrder")]
        public IActionResult UpdateOrder(UpdateOrderParam updateOrderParam)
        {
            _orderService.UpdateOrder(updateOrderParam);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteOrder/{param}")]
        public IActionResult DeleteOrder(string param)
        {
            _orderService.DeleteOrder(param);
            return Ok();
        }
    }
}
