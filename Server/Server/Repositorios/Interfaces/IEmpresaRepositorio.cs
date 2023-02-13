using Server.Models;

namespace Server.Repositorios.Interfaces
{
    public interface IEmpresaRepositorio
    {
        Task<List<EmpresaModel>> GetAllData();
        Task<EmpresaModel> GetCompanyById(int id);
        Task<EmpresaModel> AddCompany(EmpresaModel empresa);
        Task<EmpresaModel> UpdateCompany(EmpresaModel empresa, int id);
        Task<bool> DeleteCompany(int id);
    }
}
