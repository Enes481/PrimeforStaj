
using BusinessLayer.Abstract;
using Core.SendMessage;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {

        IUserService _userService;
        private readonly ILogger<UsersController> _logger;


        public UsersController(IUserService _userService, ILogger<UsersController> logger)
        {
            this._userService = _userService;
            _logger = logger;
        }


        [HttpGet("getall")]
        public async Task<IActionResult> Get()
        {
            var users = await _userService.TGetAll();

            if (users != null)
            {
                _logger.LogInformation("UsersController getall method offer called.");
                return Ok(users);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> SignUp(User user)
        {
            if (await _userService.UserAlreadyExist(user.Mail))
            {
                return BadRequest("user already exist...");
            }
            else
            {
                await _userService.Register(user);
                _logger.LogInformation("UsersController register method offer called.");
                return Ok();
            }
           

        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto logindto)
        {
            
          

            var result = await _userService.Login(/*user.Mail, user.Password, user.LockCount*/logindto);

            if (result == "invalid")
            {

                return "invalid";
            }
          
            else if(result == "blockuser")
            {
               
                return "block";
            }
            else
            {
                _logger.LogInformation("UsersController login method offer called.");
                return Ok(result);
            }   

       

        }


        [HttpPost("getUserDetails")]
        public async Task<IActionResult> getUserDetails([FromBody]string mail)
        {
            var result = await _userService.getUserDetails(mail);

            if(result != null)
            {
                _logger.LogInformation("UsersController getUserDetails method offer called.");
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("getUserDetailsById")]
        public async Task<IActionResult> getUserDetailsById(int id)
        {
            var result = await _userService.getUserDetailsById(id);
            if (result != null)
            {
                _logger.LogInformation("UsersController getUserDetailsById method offer called.");
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost("forgetuserpassword/{user_mail}/{new_password}")]
        public async Task<IActionResult> forgetUserPassword(string user_mail,string new_password)
        {
            var result = await _userService.ForgetPassword(user_mail, new_password);

            if( result != null)
            {
                _logger.LogInformation("UsersController forgetuserpassword method offer called.");
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
           
            
        }



        [HttpPost("unblockuser/{id}")]
        public async Task<IActionResult> UnblokUser(int id)
        {

            var unblock_user = await _userService.UnblockUser(id);

            if(unblock_user != null)
            {

                MessageFactory messageManager = new MessageFactory();
                IMessageFactory messageFactory = messageManager.CreateFactory(MessageTypes.BlockMsg);
                IMessage msg = messageFactory.Create();
                Console.WriteLine(msg);
                _logger.LogInformation("UsersController unblockuser method offer called and send message user");
                return Ok(unblock_user);
            }


            return BadRequest();
        }

    }
}
