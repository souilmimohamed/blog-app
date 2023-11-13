using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ImageRefoctor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfileImages_Blogs_BlogEntryId",
                table: "ProfileImages");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfileImages_Users_UserId",
                table: "ProfileImages");

            migrationBuilder.DropIndex(
                name: "IX_ProfileImages_BlogEntryId",
                table: "ProfileImages");

            migrationBuilder.DropIndex(
                name: "IX_ProfileImages_UserId",
                table: "ProfileImages");

            migrationBuilder.DropColumn(
                name: "BlogEntryId",
                table: "ProfileImages");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ProfileImages");

            migrationBuilder.AddColumn<int>(
                name: "ProfileImageId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BlogEntryHeaderImageId",
                table: "ProfileImages",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserProfileImageId",
                table: "ProfileImages",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HeaderImageId",
                table: "Blogs",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProfileImageId",
                table: "Users",
                column: "ProfileImageId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_HeaderImageId",
                table: "Blogs",
                column: "HeaderImageId",
                unique: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_ProfileImages_HeaderImageId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_ProfileImages_ProfileImageId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ProfileImageId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_HeaderImageId",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "ProfileImageId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BlogEntryHeaderImageId",
                table: "ProfileImages");

            migrationBuilder.DropColumn(
                name: "UserProfileImageId",
                table: "ProfileImages");

            migrationBuilder.DropColumn(
                name: "HeaderImageId",
                table: "Blogs");

            migrationBuilder.AddColumn<int>(
                name: "BlogEntryId",
                table: "ProfileImages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ProfileImages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProfileImages_BlogEntryId",
                table: "ProfileImages",
                column: "BlogEntryId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfileImages_UserId",
                table: "ProfileImages",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileImages_Blogs_BlogEntryId",
                table: "ProfileImages",
                column: "BlogEntryId",
                principalTable: "Blogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileImages_Users_UserId",
                table: "ProfileImages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
