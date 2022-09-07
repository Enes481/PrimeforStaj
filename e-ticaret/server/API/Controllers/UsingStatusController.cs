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
    public class UsingStatusController : Controller
    {

        IUsingStatusService usingStatusService;
        private readonly ILogger<UsingStatusController> _logger;

        public UsingStatusController(IUsingStatusService usingStatusService, ILogger<UsingStatusController> logger)
        {
            this.usingStatusService = usingStatusService;
            _logger = logger;
        }


        [HttpGet("getall")]
        public async Task<IActionResult> Get()
        {
            var result = await usingStatusService.TGetAll();
            if (result != null)
            {
                _logger.LogInformation("UsingStatusController getall method called.");
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost("add")]
        public async Task<IActionResult> Add(UsingStatus usingstatus)
        {
            if (ModelState.IsValid)
            {
                await usingStatusService.TAdd(usingstatus);
                _logger.LogInformation("UsingStatusController add method called.");
                return Ok();
            }
         
            
            return BadRequest();
        }


        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var using_status = await usingStatusService.TGetById(id);
            

            if (using_status != null)
            {
                await usingStatusService.TDelete(using_status);
                _logger.LogInformation("UsingStatusController delete method called.");
                return Ok(using_status);
            }
            return BadRequest();
        }



        [HttpPost("update")]
        public async Task<IActionResult> Update(UsingStatus usingstatus)
        {
            if (ModelState.IsValid)
            {
                _logger.LogInformation("UsingStatusController update method called.");
                await usingStatusService.TUpdate(usingstatus);
                return Ok();
            }

            return BadRequest();
               
            
           
        }



        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetById(int id)
        {

            var result = await usingStatusService.TGetById(id);

            if (result != null)
            {
                _logger.LogInformation("UsingStatusController getbyid method called.");
                return Ok(result);

            }
            else
            {
                return BadRequest();
            }
        }
    }
}
