using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.SendMessage
{
    internal class SendBlockMsgtoUserFactory : IMessageFactory
    {
        public IMessage Create()
        {
            return new SendBlockMessagetoUser();
        }
    }
}
