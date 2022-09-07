using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class Product
    {



        [Key]
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public int UsingStatusId { get; set; }
        public int OwnerId { get; set; }


        public bool isOfferable { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public bool isSold { get; set; }


        public List<Comment> Comments { get; set; }
        public int Price { get; set; }
        public string ProductImage{ get; set; }
        public Color? Color { get; set; } 
        public Brand? Brand { get; set; } 
        public Category? Category { get; set; } 
        public UsingStatus? UsingStatus { get; set; }

        public User? Owner { get; set; }

    }
}
