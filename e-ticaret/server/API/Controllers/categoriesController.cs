using BusinessLayer.Abstract;
using BusinessLayer.Concrete;
using DataAccessLayer;
using DataAccessLayer.Abstract;
using DataAccessLayer.Concrete;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class categoriesController : ControllerBase
    {

        private ICategoryService category_service;
        private readonly ILogger<categoriesController> _logger;

        public categoriesController(ICategoryService category_service, ILogger<categoriesController> logger)
        {
            this.category_service = category_service;
            _logger = logger;
        }

        // CategoryManager cm = new CategoryManager(new CategoryRepository());

        [HttpGet("getall")]
        public async Task<IActionResult> Get()
        {
            var result = await category_service.TGetAll();
            if(result != null)
            {
                _logger.LogInformation("CategoryController getall method called.");
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetByIdCategory(int id)
        {
            var category = await category_service.TGetById(id);

            if (category != null)
            {
                _logger.LogInformation("CategoryController getbyid method called.");
                return Ok(category);  // 200 ok
            }
            else
            {
                return NotFound(); //404 not found
            }
        }


        [HttpPost("add")]
        public async Task<IActionResult> Add(Category category)
        {
            if (ModelState.IsValid)
            {
                await category_service.TAdd(category);
                _logger.LogInformation("CategoryController add method called.");
                return Ok();
            }
           
            
            return BadRequest();
        }



        [HttpPost("update")]
        public async Task<IActionResult> Update(Category category)
        {
            if (ModelState.IsValid)
            {
                await category_service.TUpdate(category);
                _logger.LogInformation("CategoryController update method called.");
                return Ok();  // 200 ok
            }
        
          
            else
            {
                return BadRequest(); //404 not found
            }

        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {


            var category = await category_service.TGetById(id);
           

            if (category != null)
            {
                await category_service.TDelete(category);
                _logger.LogInformation("category delete method called.");
                return Ok(category);
            }
            _logger.LogError("category -> delete method error.");
            return BadRequest(category);

        }



    }
}
    
