using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.SendMessage
{
    public class MessageFactory
    {
        private Dictionary<MessageTypes, IMessageFactory> messages;

        public MessageFactory()
        {
            messages = new Dictionary<MessageTypes, IMessageFactory>();
            messages.Add(MessageTypes.BlockMsg, new SendBlockMsgtoUserFactory());
            messages.Add(MessageTypes.RegisterMsg, new SendRegisterMsgtoUserFactory());
        }

        public IMessageFactory CreateFactory(MessageTypes msgType)
        {
            return messages[msgType];
        }
    }

    public enum MessageTypes
    {
        BlockMsg,
        RegisterMsg
    }
}
