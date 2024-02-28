using Domain.Interfaces.Services;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Implements;

namespace WebExampleTraining.Controllers
{

    // สร้าง controller ก่อน
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet]
        [Route("QueryAllProduct")]
        public IActionResult QueryAllProduct()
        {
            var query = _productService.QueryAllProduct();
            return Ok(query);
        }

        [HttpPost]
        [Route("CreateProduct")]
        public IActionResult CreateProduct(CreateProductParam createProductParam)
        {
            _productService.CreateProduct(createProductParam);
            return Ok();
        }

        [HttpPost]
        [Route("UpdateProduct")]
        public IActionResult UpdateProduct(UpdateProductParam updateProductParam)
        {
            _productService.UpdateProduct(updateProductParam);
            return Ok();
        }

        [HttpPost]
        [Route("DeleteProduct")]
        public IActionResult DeleteProduct(DeleteProductParam deleteProductParam)
        {
            _productService.DeleteProduct(deleteProductParam);
            return Ok();
        }
    }
}
