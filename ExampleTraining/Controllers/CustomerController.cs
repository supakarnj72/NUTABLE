using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace WebExampleTraining.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost]
        [Route("QueryAllCustomer")]
        public async Task < IActionResult > QueryAllCustomer(QueryAllCustomerParam param)
        {
            var query = await _customerService.QueryAllCustomer(param);
            return Ok(query);
        }

        [HttpGet]
        [Route("GetCustomer")]
        public CustomerViewModel GetCustomer(int? id)
        {
            var customer = _customerService.GetCustomer(id);
            return customer;
        }

        [HttpPost]
        [Route("UpdateCustomer")]
        public void UpdateCustomer(CustomerViewModel param)
        {
            _customerService.UpdateCustomer(param);
        }

        [HttpPost]
        [Route("CreateCustomer")]
        public IActionResult CreateCustomer(CreateCustomerParam createCustomerParam)
        {
            _customerService.CreateCustomer(createCustomerParam);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCustomer/{param}")]
        public void DeleteCustomer(int param)
        {
            _customerService.DeleteCustomer(param);
        }
    }

}
