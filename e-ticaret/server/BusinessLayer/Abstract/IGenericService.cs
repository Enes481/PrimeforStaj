using Core.Utilities.Results;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Abstract
{
    public interface IGenericService<T>
    {

        Task TAdd(T entity);
        Task TDelete(T entity);
        Task TUpdate(T entity);
        Task<List<T>> TGetAll();
        Task<T> TGetById(int id);

     

        
    }
}
