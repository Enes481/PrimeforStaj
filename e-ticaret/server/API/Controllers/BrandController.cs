using BusinessLayer.Abstract;
using DataAccessLayer;
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

    public class BrandController : Controller
    {
        IBrandService _brandservice;
        private readonly ILogger<BrandController> _logger;


        public BrandController(IBrandService _brandservice, ILogger<BrandController> logger)
        {
            this._brandservice = _brandservice;
            _logger = logger;
        }


        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _brandservice.TGetAll();

            if (brands != null)
            {
                _logger.LogInformation("Brand getall method called.");
                return Ok(brands);
                
            }
            else
            {
                _logger.LogError("Brand -> getall method error");
                return BadRequest();
            }

        }


        [HttpPost("add")]
        public async Task<IActionResult> Add(Brand brand)
        {

            if (ModelState.IsValid)
            {
                await _brandservice.TAdd(brand);
                _logger.LogInformation("Brand add  method called.");
                return Ok();
            }
            
            _logger.LogError("Brand -> add method error.");
            return BadRequest();
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var brand =  await _brandservice.TGetById(id);
           

            if (brand != null)
            {
                await _brandservice.TDelete(brand);
                _logger.LogInformation("Brand delete method called.");
                return Ok(brand);
            }
            _logger.LogError("Brand -> delete method error.");
            return BadRequest(brand);
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update(Brand brand)
        {

            if (ModelState.IsValid)
            {
                await _brandservice.TUpdate(brand);
                _logger.LogInformation("Brand update method called.");
                return Ok();
            }
           
            
            return BadRequest();

        }


        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetById(int id)
        {

            var result = await _brandservice.TGetById(id);

            if (result != null)
            {
                _logger.LogInformation("Brand getbyid method called.");
                return Ok(result);

            }
            else
            {
                return BadRequest();
            }
        }
    }
}
