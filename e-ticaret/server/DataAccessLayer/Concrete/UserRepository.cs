using Core.Common;
using Core.SendMessage;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Concrete
{
    public class UserRepository : GenericRepository<User>, IUserDal
    {
        IConfiguration configuration;
       

        public UserRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<User> getUserDetailsById(int id)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.UserID == id);
            return user;
        }


        public async Task<User> getUserDetails(string mail)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Mail == mail);
            return user;
        }

       


        public async Task<string> Login(UserLoginDto logindto)
        {



            var crypto = new SimpleCrypto.PBKDF2();
            var _user = await dbContext.Users.Where(x => x.Mail == logindto.Mail).FirstOrDefaultAsync();
            
            if (_user != null)
            {

                if ((!_user.isLock) && (_user.Password == crypto.Compute(logindto.Password, _user.salt)))
                {


                    var authClaims = new List<Claim>
                    {
                           new Claim(ClaimTypes.Email,_user.Mail),
                           new Claim(ClaimTypes.Name,_user.Name),
                           new Claim(ClaimTypes.Surname,_user.LastName),
                           new Claim(ClaimTypes.Role,_user.role),


                           new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                    };
                    var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: configuration["JWT:ValidIssuer"],
                        audience: configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddDays(1),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature));
                    return new JwtSecurityTokenHandler().WriteToken(token);
                }
                else
                {
                    if (!_user.role.Equals("admin"))
                    {
                        _user.LockCount += 1;
                        dbContext.SaveChanges();
                        if (_user.LockCount >= 3)
                        {
                            _user.isLock = true;
                            dbContext.SaveChanges();
                            return "blockuser";
                        }
                    }
                 
                    return "invalid";
                }
            }



            return "invalid";


        }

       
        public async Task Register(User userModel)
        {

            var crypto = new SimpleCrypto.PBKDF2();
            var encrypedPassword = crypto.Compute(userModel.Password);

            var user = new User();
          

            if(userModel.UserID == 0)
            {
                user.Name = userModel.Name;
                user.LastName = userModel.LastName;
                user.Mail = userModel.Mail;
                user.Password = encrypedPassword;
                user.salt = crypto.Salt;
                //user.confirmPassword = userModel.confirmPassword;
                user.role = "user";

                await dbContext.Users.AddAsync(user);


                /*----------------------Kayıt başarılı ise mail gonderme islemi--------------------*/

                MessageFactory messageManager = new MessageFactory();
                IMessageFactory messageFactory = messageManager.CreateFactory(MessageTypes.RegisterMsg);
                IMessage msg = messageFactory.Create();
                Console.WriteLine(msg);
            }

        }

        public async Task<bool> UserAlreadyExist(string mail)
        {
            return await dbContext.Users.AnyAsync(x => x.Mail == mail);
        }

        public async Task<User> ForgetPassword(string mail, string new_password)
        {
            var crypto = new SimpleCrypto.PBKDF2();
            var encrypedPassword = crypto.Compute(new_password);

            var _user = await dbContext.Users.Where(x => x.Mail == mail).FirstOrDefaultAsync();
            User update_user = new User();

            _user.Password = encrypedPassword;
            _user.salt = crypto.Salt;
            //_user.confirmPassword = new_password;
            update_user = _user;

            return update_user;

        }


        public async Task<User> UnblockUser(int id)
        {
            var blocked_user = await dbContext.Users.Where(x => x.UserID == id).FirstOrDefaultAsync();

            User unblocked_user = new User();

            blocked_user.LockCount = 0;
            blocked_user.isLock = false;
            unblocked_user = blocked_user;
            return unblocked_user;
            

        }
    }
}
