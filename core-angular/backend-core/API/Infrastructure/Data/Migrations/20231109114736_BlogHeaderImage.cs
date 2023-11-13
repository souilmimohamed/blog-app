using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class BlogHeaderImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HeaderImage",
                table: "Blogs");

            migrationBuilder.AddColumn<int>(
                name: "BlogEntryId",
                table: "ProfileImages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProfileImages_BlogEntryId",
                table: "ProfileImages",
                column: "BlogEntryId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileImages_Blogs_BlogEntryId",
                table: "ProfileImages",
                column: "BlogEntryId",
                principalTable: "Blogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfileImages_Blogs_BlogEntryId",
                table: "ProfileImages");

            migrationBuilder.DropIndex(
                name: "IX_ProfileImages_BlogEntryId",
                table: "ProfileImages");

            migrationBuilder.DropColumn(
                name: "BlogEntryId",
                table: "ProfileImages");

            migrationBuilder.AddColumn<string>(
                name: "HeaderImage",
                table: "Blogs",
                type: "text",
                nullable: true);
        }
    }
}
