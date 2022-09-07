using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.DTOS
{
    public class UserProductDto
    {

        public int OwnerID { get; set; }
        public int CategoryId { get; set; }
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public int BrandId { get; set; }
        public int UsingStatusId { get; set; }


        public string userName { get; set; }
        public string userLastName { get; set; }

        public string  userMail { get; set; }

        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public string ColorName { get; set; }
        public string BrandName { get; set; }
        public int Price { get; set; }

        public string UsedStatus { get; set; }

        public bool isOfferable { get; set; }
        public bool isSold { get; set; }
        public string ProductDescription { get; set; }

        public string productImage { get; set; }
    }
}
