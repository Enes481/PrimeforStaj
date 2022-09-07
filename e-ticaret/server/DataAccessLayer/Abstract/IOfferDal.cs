using DataAccessLayer.Abstract.Generic;
using DataAccessLayer.UnitOfWork;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Abstract
{
    public interface IOfferDal: IUnitOfWork, IGenericDal<Offer>
    {
        List<OffersUserDto> GetUserOffers(Expression<Func<OffersUserDto, bool>> filter = null);

        List<OffersIGotDto> GetOfferIGot(Expression<Func<OffersIGotDto, bool>> filter = null);
    }
}
