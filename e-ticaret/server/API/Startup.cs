using BusinessLayer.Concrete;
using BusinessLayer.Abstract;
using DataAccessLayer.Abstract;
using DataAccessLayer.Concrete;
using DataAccessLayer.Concrete.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers() ;
            services.AddRazorPages();
            services.AddSwaggerDocument();
            
            
            //Cors için gerekli kod
            services.AddCors(options =>
                options.AddDefaultPolicy(
                builder => builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                ));



            /*jwt*/
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            }).

            AddJwtBearer(option =>
            {
                option.SaveToken = true;
                option.RequireHttpsMetadata = true;
                option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };


            });

            /*--------------------------------------------------------*/
            services.AddScoped<ICategoryDal, CategoryRepository>();     //id guncellemede sorun çýktýðý için addSingelton ý AddScoped ile genelleþtirdik,deðiþtirdik.
            services.AddScoped<ICategoryService, CategoryManager>();

            services.AddScoped<IProductDal, ProductRepository>();
            services.AddScoped<IProductService, ProductManager>();

            services.AddScoped<IColorDal, ColorRepository>();
            services.AddScoped<IColorService, ColorManager>();

            services.AddScoped<IBrandDal, BrandRepository>();
            services.AddScoped<IBrandService, BrandManager>();


            services.AddScoped<IUsingStatusDal, UsingStatusRepository>();
            services.AddScoped<IUsingStatusService, UsingStatusManager>();

            services.AddScoped<IUserDal, UserRepository>();
            services.AddScoped<IUserService, UserManager>();

            services.AddScoped<IOfferDal, OfferRepository>();
            services.AddScoped<IOfferService, OfferManager>();



            /*--------------------------------------------------------*/
            /*Fluent Validation*/
            services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }


            /*jwt*/
            app.UseAuthentication();
            app.UseAuthorization();
            /*jwt*/


            app.UseStaticFiles();
            app.UseOpenApi();
            app.UseSwaggerUi3();
            //cors kodu -- client ile baðlantý kurmaya yarýyor.
            app.UseCors();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {

                endpoints.MapRazorPages(); //Routes for pages
                endpoints.MapControllers(); //Routes for my API controllers
            });
        }
    }
}
