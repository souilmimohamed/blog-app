using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DTOs
{
    public class ImageDto
    {
        public int? BlogId { get; set; }
        public IFormFile ImageFile { get; set; }
        public string ImageFileExtension { get; set; }

        public ImageModel ToBuisnessModel()
        {
            return new ImageModel
            {
                BlogId = BlogId,
                ImageFileExtension = ImageFileExtension,
                ImageFile = getBytes(ImageFile)
            };
        }
        internal static byte[] getBytes(IFormFile file)
        {
            if (file == null || file.Length <= 0)
                return null;
            using var ms = new MemoryStream();
            file.CopyTo(ms);
            return ms.ToArray();
        }
    }

    public class ImageModel
    {
        public int? BlogId { get; set; }
        public byte[] ImageFile { get; set; }
        public string ImageFileExtension { get; set; }
    }
}
