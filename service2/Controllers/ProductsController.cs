using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

namespace api_products.Controllers
{
     [Route("api/products")]
     [EnableCors("CorsPolicy")]
     public class ProductsController : Controller
     {
          private IConfiguration _configuration;
          private IDocumentStore _store;

          public ProductsController(IConfiguration config, IDocumentStore store)
          {
               _configuration = config;
               _store = store;
          }  //ctor

          // GET api/values
          [HttpGet]
          public Product[] Get()
          {
               //return new Product[] { new Product(77, "Big Hammer", "A really big hammer")};

               //using (IDocumentSession session = _store.OpenSession())
               //{
               //     var p = session.Load<dynamic>("products/1");
               //     return new Product[] { new Product(p.id, p.name, p.description) };
               //}


               using (IDocumentSession session = _store.OpenSession())
               {
                    return session.Query<Product>().ToArray();
               }

          }

          // GET api/values/5
          [HttpGet("{id}")]
          public Product Get(int id)
          {
               //return new Product(99, "Big Hammer", "A really big hammer");

               using (IDocumentSession session = _store.OpenSession())
               {
                    return session.Load<Product>("products/" + id);
               }
          }

          // POST api/values
          [HttpPost]
          public void Post([FromBody]string value)
          {
          }

          // PUT api/values/5
          [HttpPut("{id}")]
          public void Put(int id, [FromBody]string value)
          {
          }

          // DELETE api/values/5
          [HttpDelete("{id}")]
          public void Delete(int id)
          {
          }
     }
}
