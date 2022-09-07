using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.DTOS
{
    public class OffersUserDto
    {

        public int OfferId { get; set; }
        public int ColorId { get; set; }
        public int BrandId { get; set; }
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public int OwnerId { get; set; }
        public int UsingStatusId { get; set; }
        public int? UserId { get; set; }



        public string ownerFirstName { get; set; }
        public string userFirstName { get; set; }
        public string UsingStatusName { get; set; }
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public string ColorName { get; set; }
        public string BrandName { get; set; }
        public int Price { get; set; }
        public string ProductDescription { get; set; }
        public int OfferPrice { get; set; }

        public bool isApproved { get; set; }

        public string productImage { get; set; }
    }
}
