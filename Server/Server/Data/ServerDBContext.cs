using Microsoft.EntityFrameworkCore;
using Server.Data.Map;
using Server.Models;

namespace Server.Data
{
    public class ServerDBContext : DbContext
    {
        public ServerDBContext(DbContextOptions<ServerDBContext> options) : base(options)
        { }

        public DbSet<EmpresaModel> Empresas { get; set; }
        public DbSet<FornecedorModel> Fornecedores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmpresaMap());
            modelBuilder.ApplyConfiguration(new FornecedorMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}
