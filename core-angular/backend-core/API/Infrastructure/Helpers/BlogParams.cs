using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Helpers
{
    public class BlogParams : IPaginationParams
    {
        public string SearchText { get; set; }
        public string Publisher { get; set; }
        public string SortDate { get; set; } = "DESC";
    }
}
