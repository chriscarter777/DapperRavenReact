using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_products
{
    public class TestProduct
    {
          public string Id { get; set; }
          public string Name { get; set; }
          public string Supplier { get; set; }
          public string Category { get; set; }
          public string QuantityPerUnit { get; set; }
          public int PricePerUnit { get; set; }
          public int UnitsInStock { get; set; }
          public int UnitsOnOrder { get; set; }
          public bool Discontinued { get; set; }
          public int ReorderLevel { get; set; }
     }
}
