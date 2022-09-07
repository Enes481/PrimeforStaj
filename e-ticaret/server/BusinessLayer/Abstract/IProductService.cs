using Core.Utilities.Results;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Abstract
{
    public interface IProductService: IGenericService<Product>
    {
        IDataResult<List<ProductDetailDto>> GetProductDetails();
        IDataResult<List<ProductDetailDto>> GetProductByCategoryid(int id);
        IDataResult<List<UserProductDto>> GetProductByUserId(int id);

        IDataResult<List<ProductDetailDto>> GetProductDetailsById(int id);
    }
}
