using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Raven.Client.Documents;
using System.Security.Cryptography.X509Certificates;

namespace api_products
{
     public class Startup
     {
          private IDocumentStore _store;

          public Startup(IConfiguration configuration)
          {
               Configuration = configuration;

               X509Certificate2 clientCertificate = new X509Certificate2(Configuration.GetSection("ConnectionParams")["RavenCertificate"]);
               string _defaultDb = Configuration.GetSection("ConnectionParams")["RavenDatabase"];
               string[] _urls = { Configuration.GetSection("ConnectionParams")["RavenURL"] };
               _store = new DocumentStore
               {
                    Certificate = clientCertificate,
                    Database = _defaultDb,
                    Urls = _urls
               }.Initialize();
          }

          public IConfiguration Configuration { get; }

          // This method gets called by the runtime. Use this method to add services to the container.
          public void ConfigureServices(IServiceCollection services)
          {
               services.AddMvc();
               services.AddCors(options =>
               {
                    options.AddPolicy("CorsPolicy",
                        builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
               });


               services.AddSingleton<IDocumentStore> (_store);
          }

          // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
          public void Configure(IApplicationBuilder app, IHostingEnvironment env)
          {
               if (env.IsDevelopment())
               {
                    app.UseDeveloperExceptionPage();
               }

               app.UseCors("CorsPolicy");
               app.UseMvc();
          }
     }
}
