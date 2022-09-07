using BusinessLayer.Abstract;
using Core.Utilities.Results;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class ColorManager : IColorService
    {
        IColorDal _colorDal;

        public ColorManager(IColorDal _colorDal)
        {
            this._colorDal = _colorDal;
        }

        public async Task<List<Color>> TGetAll()
        {
            return await _colorDal.GetListAll();
        }


        public async Task<Color> TGetById(int id)
        {
            return await _colorDal.GetByID(id);
        }

        public async Task TAdd(Color entity)
        {
            await _colorDal.Insert(entity);
            await _colorDal.Commit();
           

        }

        public async Task TDelete(Color entity)
        {

            await _colorDal.Delete(entity);
            await _colorDal.Commit();
            
        }

        public async Task TUpdate(Color entity)
        {
            await _colorDal.Update(entity);
            await _colorDal.Commit();
          
        }

    }
}
