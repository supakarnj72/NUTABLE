using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IProductService
    {
        List<ProductViewmodel> QueryAllProduct();
        void CreateProduct(CreateProductParam createProductParam);
        void UpdateProduct(UpdateProductParam updateProductParam);
        void DeleteProduct(DeleteProductParam deleteProductParam);
    }
}
