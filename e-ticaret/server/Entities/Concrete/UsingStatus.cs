using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class UsingStatus
    {
        [Key]
        public int UsingStatusId { get; set; }

        public string UsedStatus { get; set; }

    }
}
