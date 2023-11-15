using Infrastructure.Data;
using Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Helpers
{
    public class Seed
    {
        public Seed()
        {
            
        }

        public static async Task SeedData(DataContext context)
        {
            var _path = GetThisFilePath();
            var path = Path.GetDirectoryName(_path);

            if (!context.Blogs.Any())
            {
               var blogsData=File.ReadAllText(Path.Combine(path,"Blogs.json"));
               var blogs = JsonSerializer.Deserialize<List<BlogEntry>>(blogsData);
                blogs.ForEach(b=>b.CreatedAt = DateTime.UtcNow);
                for (int i = 0; i < blogs.Count-10; i++)
                {
                    blogs[i].PublisherId = 3;
                }
                for (int i = blogs.Count - 10; i < blogs.Count ; i++)
                {
                    blogs[i].PublisherId = 4;
                }
                context.Blogs.AddRange(blogs);
            }

            if(context.ChangeTracker.HasChanges())
                await context.SaveChangesAsync();
        }
        private static string GetThisFilePath([CallerFilePath] string path = null)
        {
            return path;
        }
    }
}
