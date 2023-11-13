using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ImagesUpated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_ProfileImages_HeaderImageId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_ProfileImages_ProfileImageId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfileImages",
                table: "ProfileImages");

            migrationBuilder.RenameTable(
                name: "ProfileImages",
                newName: "Images");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Images_HeaderImageId",
                table: "Blogs",
                column: "HeaderImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Images_ProfileImageId",
                table: "Users",
                column: "ProfileImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Images_HeaderImageId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Images_ProfileImageId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "ProfileImages");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfileImages",
                table: "ProfileImages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_ProfileImages_HeaderImageId",
                table: "Blogs",
                column: "HeaderImageId",
                principalTable: "ProfileImages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_ProfileImages_ProfileImageId",
                table: "Users",
                column: "ProfileImageId",
                principalTable: "ProfileImages",
                principalColumn: "Id");
        }
    }
}
