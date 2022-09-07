using BusinessLayer.Abstract;
using Core.Utilities.Results;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using EntityLayer.DTOS;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class UserManager : IUserService
    {

        IUserDal _userdal;

        public UserManager(IUserDal _userdal)
        {
            this._userdal = _userdal;
        }

        

        public async Task<User> getUserDetailsById(int id)
        {
            return await _userdal.getUserDetailsById(id);
        }


        public async Task<User> getUserDetails(string mail)
        {
            return await _userdal.getUserDetails(mail);
        }

        public async Task<string> Login(UserLoginDto logindto)
        {
           return  await _userdal.Login(logindto);
        }


        public async Task<bool> UserAlreadyExist(string mail)
        {
            var result = await _userdal.UserAlreadyExist(mail);
            if (result)
            {
                return true;
            }
            return false;
        }
        public async Task Register(User user)
        {
            await _userdal.Register(user);
            await _userdal.Commit();
        }

        public async Task TAdd(User entity)
        {
            await _userdal.Insert(entity);
            await _userdal.Commit();
            

        }

        public async Task TDelete(User entity)
        {
            await _userdal.Delete(entity);
            await _userdal.Commit();
            
        }

        public async Task<List<User>> TGetAll()
        {
            return await _userdal.GetListAll();
        }

        public async Task<User> TGetById(int id)
        {
            return await _userdal.GetByID(id);
        }

        public async Task TUpdate(User entity)
        {
            await _userdal.Update(entity);
            await _userdal.Commit();
          
        }

        public async Task<User> ForgetPassword(string mail, string new_password)
        {
            User user =  await _userdal.ForgetPassword(mail, new_password);
            await _userdal.Update(user);
            await _userdal.Commit();
            return user;
        }

        public async Task<User> UnblockUser(int id)
        {
            var unblock_user = await _userdal.UnblockUser(id);
            await _userdal.Commit();
            return unblock_user;
        }
    }
}
