using DataAccessLayer.Abstract.Generic;
using DataAccessLayer.Concrete;
using DataAccessLayer.UnitOfWork;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Abstract
{
    public interface IUserDal : IUnitOfWork, IGenericDal<User>
    {


        Task Register(User user);
        Task<string> Login(UserLoginDto logindto);
        Task<bool> UserAlreadyExist(string mail);

        Task<User> getUserDetails(string mail);

        Task<User> getUserDetailsById(int id);

        Task<User> ForgetPassword(string mail, string new_password);

        Task<User> UnblockUser(int id);
    }
}
