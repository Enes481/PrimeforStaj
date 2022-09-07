using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class User
    {


        [Key]
        public int UserID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }

        public string salt { get; set; }
        //public string confirmPassword { get; set; }

        //public byte[] PasswordKey { get; set; }
        public List<Product> Products { get; set; }

        public int LockCount { get; set; }

        public bool isLock { get; set; }

        public string role { get; set; }

    }
}
