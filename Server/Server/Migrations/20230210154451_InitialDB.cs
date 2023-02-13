using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fornecedor",
                table: "Empresas");

            migrationBuilder.AddColumn<int>(
                name: "FornecedorId",
                table: "Empresas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdFornecedor",
                table: "Empresas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_FornecedorId",
                table: "Empresas",
                column: "FornecedorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Empresas_Fornecedores_FornecedorId",
                table: "Empresas",
                column: "FornecedorId",
                principalTable: "Fornecedores",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Empresas_Fornecedores_FornecedorId",
                table: "Empresas");

            migrationBuilder.DropIndex(
                name: "IX_Empresas_FornecedorId",
                table: "Empresas");

            migrationBuilder.DropColumn(
                name: "FornecedorId",
                table: "Empresas");

            migrationBuilder.DropColumn(
                name: "IdFornecedor",
                table: "Empresas");

            migrationBuilder.AddColumn<string>(
                name: "Fornecedor",
                table: "Empresas",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
        }
    }
}
