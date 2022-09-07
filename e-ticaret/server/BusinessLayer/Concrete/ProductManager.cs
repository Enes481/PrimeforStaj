using BusinessLayer.Abstract;
using Core.Utilities.Results;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class ProductManager : IProductService
    {

        IProductDal _productDal;

        public ProductManager(IProductDal _productDal)
        {
            this._productDal = _productDal;

        }

        public async Task<List<Product>> TGetAll()
        {
            return await _productDal.GetListAll();
        }


        public async Task<Product> TGetById(int id)
        {
            return await _productDal.GetByID(id);
        }

        public async Task TAdd(Product entity)
        {
            await _productDal.Insert(entity);
            await _productDal.Commit();
            
        }

        public async Task TDelete(Product entity)
        {
            await _productDal.Delete(entity);
            await _productDal.Commit();
            
        }

        public async Task TUpdate(Product entity)
        {
            await _productDal.Update(entity);
            await _productDal.Commit();
            
        }

        public IDataResult<List<ProductDetailDto>> GetProductDetails()
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails());
        }

        public IDataResult<List<ProductDetailDto>> GetProductByCategoryid(int id)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(c => c.CategoryId == id));
        }

        public IDataResult<List<UserProductDto>> GetProductByUserId(int id)
        {
            return new SuccessDataResult<List<UserProductDto>>(_productDal.GetProductByUserId(c=>c.OwnerID == id));
        }

        public IDataResult<List<ProductDetailDto>> GetProductDetailsById(int id)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(c => c.ProductId == id));
        }

      
    }
}
