using Server.Models;

namespace Server.Repositorios.Interfaces
{
    public interface IFornecedorRepositorio
    {
        Task<List<FornecedorModel>> GetAllData();
        Task<FornecedorModel> GetSupplierById(int id);

        Task<FornecedorModel> AddSupplier(FornecedorModel fornecedor);
        Task<FornecedorModel> UpdateSupplier(FornecedorModel fornecedor, int id);
        Task<bool> DeleteSupplier(int id);
    }
}
