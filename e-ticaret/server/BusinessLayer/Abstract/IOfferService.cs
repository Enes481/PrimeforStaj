using Core.Utilities.Results;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Abstract
{
    public interface IOfferService: IGenericService<Offer>
    {
        IDataResult<List<OffersUserDto>> GetUserOffers(int id);

        IDataResult<List<OffersIGotDto>> GetOfferIGot(int id);
    }
}
