using DataAccessLayer.Abstract.Generic;
using DataAccessLayer.Concrete;
using DataAccessLayer.UnitOfWork;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Abstract
{
    public interface IProductDal : IUnitOfWork, IGenericDal<Product>
    {
        List<ProductDetailDto> GetProductDetails(Expression<Func<ProductDetailDto, bool>> filter = null);
        List<UserProductDto> GetProductByUserId(Expression<Func<UserProductDto, bool>> filter = null);
    }
}
