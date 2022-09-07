using DataAccessLayer.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Abstract.Generic
{
  public  interface IGenericDal<T> where T : class
    {

        Task Insert(T t);
        Task Delete(T t);
        Task Update(T t);
        Task<List<T>> GetListAll();
        Task<T> GetByID(int id);

      
    }
}
