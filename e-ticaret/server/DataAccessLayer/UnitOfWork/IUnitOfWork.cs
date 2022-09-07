using DataAccessLayer.Abstract.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DataAccessLayer.UnitOfWork
{

    public interface IUnitOfWork /*: IDisposable*/
    {
       
        Task Commit();
    }
    
}
