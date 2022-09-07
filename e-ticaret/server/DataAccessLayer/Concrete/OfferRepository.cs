using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Concrete
{
    public class OfferRepository:GenericRepository<Offer>,IOfferDal
    {




        //kullanıcının ürünlere yaptığı teklifler
        public List<OffersUserDto> GetUserOffers(Expression<Func<OffersUserDto, bool>> filter = null)
        {
            using (DatabaseContext context = new DatabaseContext())
            {

                var result = from offer in context.Offers
                             join product in context.Products
                             on offer.ProductId equals product.ProductId
                             join brand in context.Brands
                             on product.BrandId equals brand.BrandId
                             join category in context.Categories
                             on product.CategoryId equals category.CategoryId
                             join color in context.Colors
                             on product.ColorId equals color.ColorId
                             join usingstatus in context.UsingStatus
                             on product.UsingStatusId equals usingstatus.UsingStatusId
                             join owner in context.Users
                             on product.OwnerId equals owner.UserID
                             join user in context.Users
                             on offer.UserId equals user.UserID
                              

                             select new OffersUserDto
                             {

                                 OfferId = offer.OfferId,
                                 ColorId = product.ColorId,
                                 BrandId = product.BrandId,
                                 ProductId = product.ProductId,
                                 CategoryId = product.CategoryId,
                                 OwnerId = product.OwnerId,
                                 UsingStatusId = product.UsingStatusId,
                                 UserId = offer.UserId,

                                 ownerFirstName = owner.Name,
                                 userFirstName = user.Name,
                                 UsingStatusName = usingstatus.UsedStatus,
                                 ProductName = product.ProductName,
                                 CategoryName = category.CategoryName,
                                 ColorName = color.Name,
                                 BrandName = brand.Name,
                                 Price = product.Price,
                                 ProductDescription = product.ProductDescription,
                                 OfferPrice = offer.OfferedPrice,
                                 isApproved = offer.IsApproved,
                                 productImage = product.ProductImage
                                

                             };
                return filter == null
              ? result.ToList()
              : result.Where(filter).ToList();
            }
        }


        //kullanıcının ürünlerine aldığı teklifler
        public List<OffersIGotDto> GetOfferIGot(Expression<Func<OffersIGotDto, bool>> filter = null)
        {
            using (DatabaseContext context = new DatabaseContext())
            {

                var result = from user in context.Users
                             join product in context.Products
                             on user.UserID equals product.OwnerId
                             join offer in context.Offers
                             on product.ProductId equals offer.ProductId
                             join brand in context.Brands
                             on product.BrandId equals brand.BrandId
                             join category in context.Categories
                             on product.CategoryId equals category.CategoryId
                             join color in context.Colors
                             on product.ColorId equals color.ColorId
                             join usingstatus in context.UsingStatus
                             on product.UsingStatusId equals usingstatus.UsingStatusId


                             select new OffersIGotDto
                             {

                                 OfferId = offer.OfferId,
                                 ColorId = product.ColorId,
                                 BrandId = product.BrandId,
                                 ProductId = product.ProductId,
                                 CategoryId = product.CategoryId,
                                 OwnerId = product.OwnerId,
                                 UsingStatusId = product.UsingStatusId,
                                 UserId = product.OwnerId,
                                 userFirstName = user.Name,
                                 OfferPrice = offer.OfferedPrice,
                                 UsingStatusName = usingstatus.UsedStatus,
                                 ProductName = product.ProductName,
                                 CategoryName = category.CategoryName,
                                 ColorName = color.Name,
                                 BrandName = brand.Name,
                                 Price = product.Price,
                                 ProductDescription = product.ProductDescription,
                                 IsApproved = offer.IsApproved


                             };
                return filter == null
              ? result.ToList()
              : result.Where(filter).ToList();
            }
        }

       
    }
}
