using System.ComponentModel.DataAnnotations;


namespace Infrastructure.DTOs
{
    public class BlogDto
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string? Slug { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Body { get; set; }
        public int PublisherId { get; set; }
        public string? Publisher { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? HeaderImageUrl { get; set; }
        public int? Likes { get; set; }
    }
}
