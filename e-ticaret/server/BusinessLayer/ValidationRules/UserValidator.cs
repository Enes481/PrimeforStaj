using EntityLayer.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BusinessLayer.ValidationRules
{
    public class UserValidator:AbstractValidator<User>
    {

        public UserValidator()
        {
            RuleFor(x => x.Mail).NotEmpty().WithMessage("mail can not be empty ");

            RuleFor(x => x.Password).NotEmpty().WithMessage("password can not be empty");

            RuleFor(x => x.LastName).NotEmpty().WithMessage("last name can not be empty");
            RuleFor(x => x.Name).NotEmpty().WithMessage("name can not be empty");

            

           // RuleFor(x => x.Password).Must(IsPasswordValid).WithMessage("password must be at least 8 characters at most 20 characters");
        }


        //private bool IsPasswordValid(byte[] arg)
        //{
        //    try
        //    {
        //        Regex regex = new Regex(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[0-9])[A-Za-z\d]{8,20}$");
        //        return regex.IsMatch(arg);
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
    }

   
}
