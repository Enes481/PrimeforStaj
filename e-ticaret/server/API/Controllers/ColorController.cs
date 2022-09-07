using BusinessLayer.Abstract;
using DataAccessLayer;
using DataAccessLayer.UnitOfWork;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Authorization;
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
   
    public class ColorController : Controller
    {

        IColorService _colorservice;
        private readonly ILogger<ColorController> _logger;

        public ColorController(IColorService _colorservice, ILogger<ColorController> logger)
        {
            _logger = logger;
            this._colorservice = _colorservice;
          
        }

       
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var colors = await _colorservice.TGetAll();

            if(colors != null)
            {
                _logger.LogInformation("ColorController getall method called.");
                return Ok(colors);
            }
            else
            {
                return BadRequest();
            }

        }

     
        [HttpPost("add")]
       
        public async Task<IActionResult> Add(Color color)
        {
            if (ModelState.IsValid)
            {
                await _colorservice.TAdd(color);
                _logger.LogInformation("ColorController add method called.");
                return Ok();
            }
           
            
            return BadRequest();
        }
       
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int  id)
        {
            var color = await _colorservice.TGetById(id);


            if (color != null)
            {
                await _colorservice.TDelete(color);
                _logger.LogInformation("ColorController delete method called.");
                return Ok(color);
            }
            return BadRequest(color);

        }

       
        [HttpPost("update")]
        public async Task<IActionResult> Update(Color color)
        {

            if (ModelState.IsValid)
            {
                await _colorservice.TUpdate(color);
                _logger.LogInformation("color update method called.");
                return Ok();  
            }
            else
            {
                return BadRequest(); 
            }



        }


        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
           
            var color = await _colorservice.TGetById(id);
            if(color != null)
            {
                _logger.LogInformation("ColorController getbyid method called.");
                return Ok(color);
            }
                
            
            else
            {
                return BadRequest();
            }
        }

    }
}
