using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Core.SendMessage
{
    public class SendBlockMessagetoUser:IMessage
    {
        public SendBlockMessagetoUser()
        {
            SendMailtoUser();
        }

        public string Message()
        {
            return "User unblocked account message has been sent.";
        }

        public void SendMailtoUser()
        {
            MailMessage msg = new MailMessage();
            msg.Subject = "ACCOUNT INFO";
            msg.From = new MailAddress("tignobarzu@vusra.com", "From Primefor");
            msg.To.Add(new MailAddress("enest5529@gmail.com", "Payalog staj...."));
            msg.Body = "Your account has been reopened.You can enter with your password and e-mail." + msg.From.Address;
            msg.IsBodyHtml = true;
            msg.Priority = MailPriority.High;
            //Host ve Port Gereklidir!
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            //Güvenli bağlantı gerektiğinden kullanıcı adı ve şifrenizi giriniz.
            NetworkCredential AccountInfo = new NetworkCredential("enest5529@gmail.com", "nyvkaeimjydhdswv");
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = AccountInfo;
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Send(msg);
            //Güvenli bağlantı gerektiğinden kullanıcı adı ve şifrenizi giriniz.
        }
    }
}
