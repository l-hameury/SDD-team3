using System;
using System.Collections.Immutable;
using System.Runtime.Serialization;
using System.Net.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using rtchatty.Database;
using rtchatty.Hubs;
using rtchatty.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace rtchatty
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
			
			// Enable scoped lifetime of UserService service for Dependency Injection
			// DI Explanation from Microsoft: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-5.0
			services.AddScoped<UserService>();

			services.AddSingleton<IChattyDatabaseSettings>(
				db => db.GetRequiredService<IOptions<ChattyDatabaseSettings>>().Value);

			services.AddControllers();

			services.Configure<ChattyDatabaseSettings>(
				Configuration.GetSection(nameof(ChattyDatabaseSettings)));


			services.AddAuthentication(x =>
           {
               x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
               x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
           })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("JwtKey").ToString())),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };

                });

			

			services.AddControllersWithViews();
			services.AddSignalR();


			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			

			if (env.IsDevelopment())
			{
				app.UseAuthentication(); //authentication
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
				// Map the /chatHub endpoint to our ChatHub class
				endpoints.MapHub<ChatHub>("/chatHub");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
		}
	}
}
