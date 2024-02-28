using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Implements;

namespace WebExampleTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : Controller
    {
        private readonly IOrderDetailService _orderDetailService;

        public OrderDetailController(IOrderDetailService orderDetailService)
        {
            _orderDetailService = orderDetailService;
        }

        [HttpPost]
        [Route("QueryAllOrdersDetails/{orderId}")]
        public List<OrderDetailViewModel> QueryAllOrdersDetails(string orderId)
        {
            var query = _orderDetailService.QueryAllOrdersDetails(orderId);
            return query;
        }

        [HttpPost]
        [Route("UpdateOrderDetail")]
        public IActionResult UpdateOrderDetail(UpdateOrderDetailParam updateOrderDetailParam)
        {
            return Ok(_orderDetailService.UpdateOrderDetail(updateOrderDetailParam));
        }

        [HttpPost]
        [Route("DeleteOrderDetail")]
        public IActionResult DeleteOrderDetail(DeleteOrderDetailParam param)
        {
            return Ok(_orderDetailService.DeleteOrderDetail(param));
        }
    }
}
