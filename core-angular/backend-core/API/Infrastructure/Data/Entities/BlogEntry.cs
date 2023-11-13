using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Entities
{
    public class BlogEntry
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int Likes { get; set; }
        public int? HeaderImageId { get; set; }
        public Image HeaderImage { get; set; }
        public DateTime? PublishedDate { get; set; }
        public bool? IsPublished { get; set; }
        public int PublisherId { get; set; }
        public User Publisher { get; set; }
    }
}
