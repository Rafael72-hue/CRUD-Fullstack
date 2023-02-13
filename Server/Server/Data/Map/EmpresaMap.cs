using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data.Map
{
    public class EmpresaMap : IEntityTypeConfiguration<EmpresaModel>
    {
        public void Configure(EntityTypeBuilder<EmpresaModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Cnpj).IsRequired().HasMaxLength(20);
            builder.Property(x => x.NmEmpresa).IsRequired().HasMaxLength(150);
            builder.Property(x => x.Cep).IsRequired().HasMaxLength(10);
            builder.Property(x => x.IdFornecedor);
            builder.HasOne(x => x.Fornecedor);
        }
    }
}
