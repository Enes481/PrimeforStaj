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
    public class BrandManager : IBrandService
    {
        IBrandDal _brandDal;
        public BrandManager(IBrandDal _brandDal)
        {
            this._brandDal = _brandDal;
        }


        public async Task<List<Brand>> TGetAll()
        {
            return await _brandDal.GetListAll();
        }


        public async Task<Brand> TGetById(int id)
        {
            return await _brandDal.GetByID(id);
        }

        public async Task TAdd(Brand entity)
        {
             await _brandDal.Insert(entity);
             await _brandDal.Commit();
            

        }

        public async Task TDelete(Brand entity)
        {

            await _brandDal.Delete(entity);
            await _brandDal.Commit();
            
        }

        public async Task TUpdate(Brand entity)
        {
            await _brandDal.Update(entity);
            await _brandDal.Commit();
            

        }
    }
}
