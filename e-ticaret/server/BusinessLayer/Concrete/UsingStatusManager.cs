using BusinessLayer.Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class UsingStatusManager : IUsingStatusService
    {

        IUsingStatusDal _usingStatusDal;

        public UsingStatusManager(IUsingStatusDal _usingStatusDal)
        {
            this._usingStatusDal = _usingStatusDal;
        }


        public async Task<List<UsingStatus>> TGetAll()
        {
            return await _usingStatusDal.GetListAll();
        }


        public async Task<UsingStatus> TGetById(int id)
        {
            return await _usingStatusDal.GetByID(id);
        }

        public async Task TAdd(UsingStatus entity)
        {
            await _usingStatusDal.Insert(entity);
            await _usingStatusDal.Commit();
            
        }

        public async Task TDelete(UsingStatus entity)
        {

            await _usingStatusDal.Delete(entity);
            await _usingStatusDal.Commit();
            

        }

        public async Task TUpdate(UsingStatus entity)
        {
            await _usingStatusDal.Update(entity);
            await _usingStatusDal.Commit();
           

        }
    }
}
