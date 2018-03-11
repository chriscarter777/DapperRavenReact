using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace api_customers.Controllers
{
     [Route("api/customers")]
     [EnableCors("CorsPolicy")]
     public class CustomersController : Controller
    {
          private IConfiguration _configuration;
          public CustomersController(IConfiguration config)
          {
               _configuration = config;
          }

          // GET api/values
          [HttpGet]
        public Customer[] Get()
        {
               string customerQuery = "SELECT * FROM Customers;";
               using (IDbConnection connection = new SqlConnection(ConfigurationExtensions.GetConnectionString(_configuration, "LocalDb")))
               {
                    return connection.Query<Customer>(customerQuery).ToArray();
               }
          }

          // GET api/values/5
          [HttpGet("{id}")]
        public Customer Get(int id)
        {
               //return new Customer { Id = 99, Name = "Joe Schmoe", Address = "Anywhere or Nowhere" };

               string customerQuery = "SELECT * FROM Customers WHERE Id = @requestedId;";
               using (IDbConnection connection = new SqlConnection(ConfigurationExtensions.GetConnectionString(_configuration, "LocalDb")))
               {
                    return connection.QueryFirstOrDefault<Customer>(customerQuery, new { requestedId = id });
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
