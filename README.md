# Primefor internship e-commerce project
primefor-2022-staj-Ismail Enes Tigli <br/>
primefor-2022-staj-Enes481 created by GitHub Classroom
## Project Summary
#### TR <br/>
Proje basit bir e-ticaret sitesidir. Kullanıcıların ürün ekleyebildiği,ürünlere teklif verebildiği,satın alabildiği ve guncelleyebildiği bir e-ticaret sitesidir. 
Ürünlerin yanı sıra renk ekleme,guncelleme,silme, marka ekleme,guncelleme,silme, ürünlerin ikinci el ya da sıfır gibi kullanım durumlarını ekleme ,guncelleme ve 
silme gibi özellikler de mevcuttur. Projede rol bazlı erişim kullanılmıştır. Projede admin ve user olmak üzere iki tane kullanıcı vardır. Guncelleme,silme,ekleme gibi
kritik durumları sadece admin yapabilmektedir. Admin kullanıcıların bilgilerini görebildiği bir admin sayfasına sahiptir. Eğer kullanıcılar 3 kere şifrelerini yanlış 
girerse hesapları bloke edilmektedir. Admin bu panelden kullanıcıların hesaplarının bloğunu kaldırabilmektedir. Böylece kullanıcılar tekrar dan hesaplarına girebilmektedirler. Proje de BACKEND için ASP.NET CORE WEB API kullanılmıştır. React ile de FRONTEND geliştirilmiştir.
### Proje hakkında bilgilendirme
- projede bazen resim yüklerken resimlerde hata oluşabiliyor. Bunun nedeni resimden kaynaklanmaktadır. 
- swagger çalıştırmak için url ye /swagger eklemeniz gerekmektedir.
- bir kullanıcı kayıt olduğu zaman default user olarak kayıt olmaktadır. Eğer bir kullanıcının admin olmasını istiyorsanız onu veri tabanında default olarak gelen user'ı admin olarak değiştirmeniz gerekmektedir.

#### EN <br/>
The project is a simple e-commerce site. It is an e-commerce site where users can add products, bid on products, buy and update them.
In addition to products, adding color, updating, deleting, adding brand, updating, deleting, adding second-hand or new use cases of products, updating and
Features such as deletion are also available. Role based access was used in the project. There are two users in the project, admin and user. such as updating, deleting, adding. Only the admin can handle critical situations. Admin has an admin page where users can see their information. If users wrong password 3 times
their accounts are blocked. Admin can unblock users' accounts from this panel. Thus, users can log into their accounts again. ASP.NET CORE WEB API was used for BACKEND in the project. FRONTEND has also been developed with React.
### Information about the project
- In the project, sometimes an error may occur in the images while uploading the images. This is because of the picture.
- To run swagger, you need to add /swagger to the url.
- When a user registers, it registers as the default user. If you want a user to be admin, you need to change the default user in the database to admin.

# Technologies used in the project

### - N-tier architecture
### - Code First
### - Generic Repository pattern
### - IUnitofWork pattern
### - Factory Pattern
### - Serilog.Sinks.File (to log to file)
### - SimpleCrypto
### - FluentValidation
### - JsonWebToken
### - LinQ
### - Dto's
### - API

# How to run the project
## Backend

- Clone branches this project
- Click SOLUTIONNAME.sln and open with Visual Studio
- Navigate to Build - Rebuild Solution
- Navigate to Package Manager Console
- add-migration mig
- update-database
- Press F5 to run the project. (Make sure APINAME is set as startup project)

## Frontend
- cd projectFileName/
- npm install
- npm run start

## Project Images

![display image](https://github.com/Enes481/PrimeforStaj/blob/main/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(134).png)
<br/><br/><br/><br/><br/><br/><br/><br/><br/>
![display image](https://github.com/Enes481/PrimeforStaj/blob/main/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(135).png)

<br/><br/><br/><br/><br/><br/><br/><br/><br/>
![display image](https://github.com/Enes481/PrimeforStaj/blob/main/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(136).png)
<br/><br/><br/><br/><br/><br/><br/><br/><br/>
![display image](https://github.com/payologllc/primefor-2022-staj-Enes481/blob/main/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(139).png)
