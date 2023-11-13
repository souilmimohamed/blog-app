using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }
        public int? UserProfileImageId { get; set; }
        public int? BlogEntryHeaderImageId { get; set; }
        public User ImageProfileUser { get; set; }
        public BlogEntry ImageHeaderBlog { get; set; }
    }
}
