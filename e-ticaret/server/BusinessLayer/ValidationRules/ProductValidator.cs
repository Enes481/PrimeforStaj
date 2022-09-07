using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityLayer.Concrete;
using FluentValidation;

namespace BusinessLayer.ValidationRules
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.ProductName).NotEmpty().Length(3,100).WithMessage("product name can not be empty or length must be min 3 character max 100 character ");

            RuleFor(x => x.ProductDescription).NotEmpty().Length(3,500).WithMessage("description can not be empty  or length must be min 3 character max 500 character");



           
        }
    }
}
