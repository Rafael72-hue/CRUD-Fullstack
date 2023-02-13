namespace Server.Models
{
    public class EmpresaModel
    {
        public int Id { get; set; }
        public string Cnpj { get; set; }
        public string NmEmpresa { get; set; }
        public string Cep { get; set; }
        public int? IdFornecedor{ get; set; }

        public virtual FornecedorModel? Fornecedor { get; set; }
    }
}
