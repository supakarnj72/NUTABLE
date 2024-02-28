using Domain.Interfaces.Services;
using Domain.Models;
using Domain.ViewModels;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implements
{
    internal class ProductService : IProductService
    {
        public readonly ExamsContext _examsContext;

        public ProductService(ExamsContext examsContext) 
        {
            _examsContext = examsContext;
        }

        public void CreateProduct(CreateProductParam createProductParam)
        {
            var product = new Products();
            product.Name = createProductParam.Name;
            product.Price = createProductParam.Price;

            product.ProductId = GetProductIDMax() +1;

            _examsContext.Products.Add(product);
            _examsContext.SaveChanges();
        }

        private int GetProductIDMax()
        {
            List<Products> productlist = _examsContext.Products.ToList();

            int max = -1;

            for (int i = 0; i < productlist.Count ;i++) 
            {
                var tmp = productlist[i];
                if (tmp.ProductId > max)
                {
                    max = tmp.ProductId;
                }
            }

           
            return max;

        }

        public void UpdateProduct(UpdateProductParam updateProductParam) 
        { 
            
            Products updateProduct = FindProduct(updateProductParam.ProductID);


            updateProduct.Name = updateProductParam.Name;
            updateProduct.Price = updateProductParam.Price;

            _examsContext.Products.Update(updateProduct);
            _examsContext.SaveChanges();
        }


        public void DeleteProduct(DeleteProductParam deleteProductParam) 
        {
            Products removeProduct = FindProduct(deleteProductParam.ProductID);
         
            _examsContext.Products.Remove(removeProduct);
            _examsContext.SaveChanges();
        }

        public List<ProductViewmodel> QueryAllProduct()
        {
            List<Products> productlist = _examsContext.Products.ToList();

            var productVM = new List<ProductViewmodel>();

            foreach (var product in productlist)
            {
                ProductViewmodel productViewmodel = new ProductViewmodel();
                productViewmodel.Price = product.Price;
                productViewmodel.ProductID = product.ProductId;
                productViewmodel.ProductName = product.Name;
                productVM.Add(productViewmodel);

            }

            return productVM;
        }


        private Products FindProduct(int productID)
        {
            var productlist = _examsContext.Products.ToList();
            Products findProduct = null;

            foreach (var product in productlist)
            {
                if (product.ProductId == productID)
                {
                    findProduct = product;
                }
            }
            return findProduct;
        }
    }

    
}
