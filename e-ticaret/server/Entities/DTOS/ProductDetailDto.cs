

namespace EntityLayer.Concrete
{
    public class ProductDetailDto
    {

        public  int CategoryId { get; set; }
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public int BrandId { get; set; }
        public int OwnerID { get; set; }
        public int UsingStatusID { get; set; }


        public string ProductName { get; set; }
        public string  CategoryName { get; set; }
        public string ColorName { get; set; }
        public string BrandName { get; set; }
        public int Price { get; set; }
       

        public bool isOfferable { get; set; }
        public bool isSold { get; set; }
        public string ProductDescription { get; set; }

        public string image { get; set; }

        public string UsedStatus { get; set; }
    }
}
