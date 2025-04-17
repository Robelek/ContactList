using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ContactListAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateWithSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubCategoryType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategoryType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubCategoryType_CategoryType_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "CategoryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    SubCategoryID = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserRole = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Users_CategoryType_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "CategoryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Users_SubCategoryType_SubCategoryID",
                        column: x => x.SubCategoryID,
                        principalTable: "SubCategoryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "CategoryType",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Work" },
                    { 2, "Private" },
                    { 3, "Other" }
                });

            migrationBuilder.InsertData(
                table: "SubCategoryType",
                columns: new[] { "Id", "CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Boss" },
                    { 2, 1, "Client" },
                    { 3, 1, "Administrator" },
                    { 4, 1, "HR" },
                    { 5, 1, "Developer" },
                    { 6, 1, "Manager" },
                    { 7, 1, "Intern" },
                    { 8, 1, "Support" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryType_Name",
                table: "CategoryType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubCategoryType_CategoryId",
                table: "SubCategoryType",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategoryType_Name",
                table: "SubCategoryType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_CategoryId",
                table: "Users",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ID",
                table: "Users",
                column: "ID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SubCategoryID",
                table: "Users",
                column: "SubCategoryID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "SubCategoryType");

            migrationBuilder.DropTable(
                name: "CategoryType");
        }
    }
}
