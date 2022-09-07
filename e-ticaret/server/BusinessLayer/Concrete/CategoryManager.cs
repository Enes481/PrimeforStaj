using BusinessLayer.Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class CategoryManager:ICategoryService
    {

        ICategoryDal _categoryDal;
        
        public CategoryManager(ICategoryDal _cateogoryDal)
        {
          
            this._categoryDal = _cateogoryDal;

        }

        public  async Task<List<Category>> TGetAll()
        {
            return await _categoryDal.GetListAll();
        }


        public async Task<Category> TGetById(int id)
        {
            return await _categoryDal.GetByID(id);
        }

        public async Task TAdd(Category entity)
        {
            await _categoryDal.Insert(entity);
            await _categoryDal.Commit();
           
            
        }

        public async Task TDelete(Category entity) {

            await _categoryDal.Delete(entity);
            await _categoryDal.Commit();
            
        }

        public async Task TUpdate(Category entity)
        {
            await _categoryDal.Update(entity);
            await _categoryDal.Commit();
            
        }

      
    }
}

