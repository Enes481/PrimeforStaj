using BusinessLayer.Abstract;
using Core.Utilities.Results;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class OfferManager : IOfferService
    {
        IOfferDal offerDal;

        public OfferManager(IOfferDal offerDal)
        {
            this.offerDal = offerDal;
        }

        public async Task TAdd(Offer entity)
        {
            await offerDal.Insert(entity);
            await offerDal.Commit();
            
        }

        public async Task TDelete(Offer entity)
        {
            await offerDal.Delete(entity);
            await offerDal.Commit();
           

        }

        public async Task<List<Offer>> TGetAll()
        {
            return await offerDal.GetListAll();
        }

        public async Task<Offer> TGetById(int id)
        {
            return await offerDal.GetByID(id);
        }

        public async Task TUpdate(Offer entity)
        {
            await offerDal.Update(entity);
            await offerDal.Commit();
            
        }

        public IDataResult<List<OffersUserDto>> GetUserOffers(int id)
        {
            return new SuccessDataResult<List<OffersUserDto>>(offerDal.GetUserOffers(c =>c.UserId == id));
        }

        public IDataResult<List<OffersIGotDto>> GetOfferIGot(int id)
        {
            return new SuccessDataResult<List<OffersIGotDto>>(offerDal.GetOfferIGot(c => c.UserId == id));
        }
    }
}
