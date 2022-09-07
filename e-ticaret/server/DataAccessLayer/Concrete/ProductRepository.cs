using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Concrete
{
    public class ProductRepository : GenericRepository<Product> ,IProductDal
    {



        //kullanıcının ürünlerini getirmek için oluşturulan UserProductDto'su
        public List<UserProductDto> GetProductByUserId(Expression<Func<UserProductDto, bool>> filter = null)
        {
            using (DatabaseContext context = new DatabaseContext())
            {

                var result = from product in context.Products
                             join color in context.Colors
                             on product.ColorId equals color.ColorId
                             join brand in context.Brands
                             on product.BrandId equals brand.BrandId
                             join category in context.Categories
                             on product.CategoryId equals category.CategoryId
                             join user in context.Users
                             on product.OwnerId equals user.UserID
                             join usingstatus in context.UsingStatus
                             on product.UsingStatusId equals usingstatus.UsingStatusId

                             select new UserProductDto
                             {
                               
                                 ProductName = product.ProductName,
                                 CategoryName = category.CategoryName,
                                 ColorName = color.Name,
                                 BrandName = brand.Name,
                                 Price = product.Price,
                                 isSold = product.isSold,
                                 isOfferable = product.isOfferable,
                                 ProductDescription = product.ProductDescription,
                                 UsedStatus = usingstatus.UsedStatus,
                                 UsingStatusId = usingstatus.UsingStatusId,
                                 CategoryId = category.CategoryId,
                                 BrandId = brand.BrandId,
                                 ColorId = color.ColorId,
                                 ProductId=product.ProductId,
                                 OwnerID = user.UserID,
                                 userMail = user.Mail,
                                 userName = user.Name,
                                 userLastName = user.LastName,
                                 productImage = product.ProductImage
                                 

                             };
                return filter == null
              ? result.ToList()
              : result.Where(filter).ToList();
            }
        }


        //Kategori'ye göre ürünleri getiren ProductDetailsDto 'su
        public List<ProductDetailDto> GetProductDetails(Expression<Func<ProductDetailDto, bool>> filter = null)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
               
                var result = from product in context.Products
                             join color in context.Colors
                             on product.ColorId equals color.ColorId
                             join brand in context.Brands
                             on product.BrandId equals brand.BrandId
                             join category in context.Categories
                             on product.CategoryId equals category.CategoryId
                             join user in context.Users
                             on product.OwnerId equals user.UserID
                             join usingstatus in context.UsingStatus
                             on product.UsingStatusId equals usingstatus.UsingStatusId

                             select new ProductDetailDto
                             {

                                 ColorId = product.ColorId,
                                 BrandId = product.BrandId,
                                 ProductId = product.ProductId,
                                 CategoryId = product.CategoryId,
                                 ProductName = product.ProductName,
                                 CategoryName = category.CategoryName,
                                 ColorName = color.Name,
                                 BrandName = brand.Name,
                                 Price = product.Price,
                                 isSold = product.isSold,
                                 isOfferable = product.isOfferable,
                                 ProductDescription = product.ProductDescription,
                                 OwnerID = product.OwnerId,
                                 UsingStatusID = product.UsingStatusId,
                                 image = product.ProductImage,
                                 UsedStatus = usingstatus.UsedStatus

                             };
                return filter == null
              ? result.ToList()
              : result.Where(filter).ToList();
            }
        }




       
    }
}
