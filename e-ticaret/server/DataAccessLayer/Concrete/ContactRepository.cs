using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Concrete
{
    public class ContactRepository : GenericRepository<Contact>, IContactDal
    {
       
    }
}
