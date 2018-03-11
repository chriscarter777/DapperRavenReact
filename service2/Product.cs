using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_products
{
    public class Product
    {
          public string Id { get; set; }
          public string Name { get; set; }
          public string Description { get; set; }

          public Product(string id, string name, string description)
          {
               Id = id;
               Name = name;
               Description = description;
          }
     }
}
