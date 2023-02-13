using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repositorios.Interfaces;
using Newtonsoft.Json;
using System.Net;

namespace Server.Repositorios
{
    public class EmpresaRepositorio : IEmpresaRepositorio
    {
        private readonly ServerDBContext _dbContext;


        public EmpresaRepositorio(ServerDBContext serverDBContext)
        {
            _dbContext = serverDBContext;
        }

        public async Task<EmpresaModel> AddCompany(EmpresaModel empresa)
        {  
            if (empresa.Cep.Length < 8 || (empresa.Cnpj.Length > 0 && empresa.Cnpj.Length < 14))
            {
                throw new Exception("Preencher o campo corretamente");
            }

            await _dbContext.AddAsync(empresa);
            await _dbContext.SaveChangesAsync();


            return empresa;
        }

        public async Task<bool> DeleteCompany(int id)
        {
            EmpresaModel empresaById = await GetCompanyById(id);

            if(empresaById == null)
            {
                throw new Exception("Empresa não foi encontrada no banco de dados.");
            }

            _dbContext.Empresas.Remove(empresaById);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<EmpresaModel>> GetAllData()
        {
            return await _dbContext.Empresas.ToListAsync();
        }

        public async Task<EmpresaModel> GetCompanyById(int id)
        {
            return await _dbContext.Empresas.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<EmpresaModel> UpdateCompany(EmpresaModel empresa, int id)
        {
            EmpresaModel empresaById = await GetCompanyById(id);

            if (empresaById == null)
            {
                throw new Exception($"Usuário para o ID:{id} não foi encontrado no banco de dados.");
            }

            if (empresa.Cep.Length < 8 || (empresa.Cnpj.Length > 0 && empresa.Cnpj.Length < 14))
            {
                throw new Exception("Preencher o campo corretamente");
            }

            empresaById.Cnpj = empresa.Cnpj;
            empresaById.NmEmpresa = empresa.NmEmpresa;
            empresaById.Cep = empresa.Cep;
            empresaById.IdFornecedor = empresa.IdFornecedor;

            _dbContext.Empresas.Update(empresaById);
            await _dbContext.SaveChangesAsync();

            return empresaById;
        }
    }
}
