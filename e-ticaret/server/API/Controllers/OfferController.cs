using BusinessLayer.Abstract;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : Controller
    {

        IOfferService offerservice;
        private readonly ILogger<OfferController> _logger;

        public OfferController(IOfferService offerservice, ILogger<OfferController> logger)
        {
            _logger = logger;
            this.offerservice = offerservice;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> Get()
        {
            var result = await offerservice.TGetAll();
            if(result != null)
            {
                _logger.LogInformation("OfferController getall method called.");
                return Ok(result);
            }
            return BadRequest();
        }


        [HttpPost("add")]
        public async Task<IActionResult> AddNewOffer(Offer offer)
        {
            if (ModelState.IsValid)
            {
                _logger.LogInformation("OfferController add method called.");
                await offerservice.TAdd(offer);
                return Ok();
            }
                
            
            return BadRequest();
        }


        [HttpGet("getuseroffers/{id}")]
        public IActionResult GetUserOffers(int id)
        {
            var result = offerservice.GetUserOffers(id);

            if (result != null)
            {
                _logger.LogInformation("OfferController getuseroffers method called.");

                return Ok(result);
            }
            return BadRequest(result);

        }


        [HttpGet("getoffersigot/{id}")]
        public IActionResult GetOffersIGot(int id)
        {
            var result = offerservice.GetOfferIGot(id);

            if (result != null)
            {
                _logger.LogInformation("OfferController getoffersigot method called.");

                return Ok(result);
            }
            return BadRequest(result);

        }


        [HttpDelete("cancelOffer/{id}")]
        public async Task<IActionResult> CancelOffer(int id )
        {

            var offer = await offerservice.TGetById(id);
            if(offer != null)
            {
                await offerservice.TDelete(offer);
                _logger.LogInformation("OfferController delete method offer called.");
                return Ok();
            }
            return BadRequest();
           
        }



        [HttpPost("UpdateIsApprovedOffer/{id}")]
        public async Task<IActionResult> UpdateOfferIsApprovedState(int id)
        {

            var offer = await offerservice.TGetById(id);

            
            if(offer != null)
            {
                Offer new_offer = new Offer();
                offer.IsApproved = true;
                new_offer = offer;
                await offerservice.TUpdate(new_offer);
                _logger.LogInformation("OfferController UpdateIsApprovedOffer method called.");
                return Ok();
            }
            else
            {
                return BadRequest();
            }
            

        }

    }
}
