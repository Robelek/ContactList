using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactListAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategoryType_CategoryType_CategoryId",
                table: "SubCategoryType");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_CategoryType_CategoryId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_SubCategoryType_SubCategoryID",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubCategoryType",
                table: "SubCategoryType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryType",
                table: "CategoryType");

            migrationBuilder.RenameTable(
                name: "SubCategoryType",
                newName: "SubCategory");

            migrationBuilder.RenameTable(
                name: "CategoryType",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategoryType_Name",
                table: "SubCategory",
                newName: "IX_SubCategory_Name");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategoryType_CategoryId",
                table: "SubCategory",
                newName: "IX_SubCategory_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryType_Name",
                table: "Category",
                newName: "IX_Category_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubCategory",
                table: "SubCategory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategory_Category_CategoryId",
                table: "SubCategory",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Category_CategoryId",
                table: "Users",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_SubCategory_SubCategoryID",
                table: "Users",
                column: "SubCategoryID",
                principalTable: "SubCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategory_Category_CategoryId",
                table: "SubCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Category_CategoryId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_SubCategory_SubCategoryID",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubCategory",
                table: "SubCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.RenameTable(
                name: "SubCategory",
                newName: "SubCategoryType");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "CategoryType");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategory_Name",
                table: "SubCategoryType",
                newName: "IX_SubCategoryType_Name");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategory_CategoryId",
                table: "SubCategoryType",
                newName: "IX_SubCategoryType_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Category_Name",
                table: "CategoryType",
                newName: "IX_CategoryType_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubCategoryType",
                table: "SubCategoryType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryType",
                table: "CategoryType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategoryType_CategoryType_CategoryId",
                table: "SubCategoryType",
                column: "CategoryId",
                principalTable: "CategoryType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_CategoryType_CategoryId",
                table: "Users",
                column: "CategoryId",
                principalTable: "CategoryType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_SubCategoryType_SubCategoryID",
                table: "Users",
                column: "SubCategoryID",
                principalTable: "SubCategoryType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
