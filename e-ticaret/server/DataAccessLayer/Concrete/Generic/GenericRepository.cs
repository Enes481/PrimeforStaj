using DataAccessLayer.Abstract.Generic;
using DataAccessLayer.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace DataAccessLayer.Concrete
{
    public class GenericRepository<T> :IUnitOfWork, IGenericDal<T> where T : class
    {


        protected DatabaseContext dbContext = new DatabaseContext();

        
        public async Task Commit()
        {
           await dbContext.SaveChangesAsync();
        }

        public async Task Delete(T t)
        {

            dbContext.Remove(t);
        }

        //public void Dispose()
        //{
        //    dbContext.Dispose();
        //}

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return dbContext.Set<T>().Where(expression).AsNoTracking();
        }

        public async Task<T> GetByID(int id)
        {

            return await dbContext.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> GetListAll()
        {
            return  await dbContext.Set<T>().ToListAsync();
        }

        public async Task<List<T>> GetListAll(Expression<Func<T, bool>> filter)
        {
            return await dbContext.Set<T>().Where(filter).ToListAsync();
        }

        public async Task Insert(T t)
        {
            await dbContext.Set<T>().AddAsync(t);
            
            
        }

        public async Task Update(T t)
        {
            var updatedEntity =   dbContext.Entry(t);
            updatedEntity.State = EntityState.Modified;
            


        }

        

      
    }
}
