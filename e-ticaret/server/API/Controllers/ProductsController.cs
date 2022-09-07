using BusinessLayer.Abstract;
using DataAccessLayer.Concrete;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Utilities.Results;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        private IProductService product_service;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductService product_service, ILogger<ProductsController> logger)
        {
            this.product_service = product_service;
            _logger = logger;
        }


        [HttpGet("getall")]
        public async Task<IActionResult> Get()
        {
            var result = await product_service.TGetAll();
            if(result != null)
            {
                _logger.LogInformation("ProductsController getall method called.");
                return Ok(result);
            }
            return BadRequest();
        }


        [HttpGet("getproductdetails")]
        public IActionResult GetProductDetails()
        {
            var result = product_service.GetProductDetails();

            if (result != null)
            {
                _logger.LogInformation("ProductsController getproductdetails method called.");

                return Ok(result);
            }
            return BadRequest(result);
           
        }

      



        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetByIdProduct(int id)
        {
            var product = await product_service.TGetById(id);
            
            if (product != null)
            {
                _logger.LogInformation("ProductsController GetByIdProduct method called.");
                return Ok(product);  // 200 ok
            }
            else
            {
                return NotFound(); //404 not found
            }
        }


        [HttpPost("add")]
        public IActionResult Add(Product product)
        {
            if (ModelState.IsValid)
            {
                product_service.TAdd(product);
                _logger.LogInformation("ProductsController add method called.");
                return Ok();
            }
          
            
            return BadRequest();
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {


            var product = await product_service.TGetById(id);
            if(product != null)
            {
                await product_service.TDelete(product);
                _logger.LogInformation("ProductsController delete method called.");
                return Ok();
            }
            return BadRequest();



        }



        [HttpGet("getproductbycategoryid/{id}")]
        public IActionResult GetProductByCategoryid(int id)
        {
            var result = product_service.GetProductByCategoryid(id);

            if (result != null)
            {
                _logger.LogInformation("ProductsController getproductbycategoryid method called.");
                return Ok(result);
            }
            return BadRequest(result);

        }


        [HttpGet("getproductbyuserid/{id}")]
        public IActionResult GetProductByUserid(int id)
        {
            var result = product_service.GetProductByUserId(id);
            
            if (result != null)
            {
                _logger.LogInformation("ProductsController getproductbyuserid method called.");
                return Ok(result);
            }
            return BadRequest(result);

        }


        //kullanıcı direk ürünü satın almak istediğinde
        [HttpPost("buyproduct")]
        public async Task<IActionResult> BuyProduct(Product product)
        {

            if (product != null)
            {
              
               
                if (product_service.TUpdate(product) != null)
                {
                    _logger.LogInformation("ProductsController getproductbyuserid method called.");
                    return Ok();
                }
                else
                {
                    return BadRequest(); 
                }
                
            }
            else
            {

                return BadRequest();
            }
        
        }


        [HttpGet("getproductdetailsById/{id}")]
        public IActionResult GetProductDetailsById(int id)
        {
            var result = product_service.GetProductDetailsById(id);

            if (result != null)
            {
                _logger.LogInformation("ProductsController getproductdetailsById method called.");
                return Ok(result);
            }
            return BadRequest(result);

        }


        //offer da eğer ürünü satın alma açılırsa ürünün id sine göre ürünü ekleme işlemi
        [HttpPost("updateproductbyid")]
        public async Task<IActionResult> UpdateProductById(Product product)
        {

            var result = product_service.TUpdate(product);
            if (result != null)
            {
                _logger.LogInformation("ProductsController updateproductbyid method called.");
                return Ok(result);  // 200 ok
            }
            else
            {
                return BadRequest(); //404 not found
            }
        }



     

    }
}
