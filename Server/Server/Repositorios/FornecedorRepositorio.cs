using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repositorios.Interfaces;

namespace Server.Repositorios
{
    public class FornecedorRepositorio : IFornecedorRepositorio
    {
        private readonly ServerDBContext _dbContext;

        public FornecedorRepositorio(ServerDBContext serverDBContext) { 
            _dbContext = serverDBContext;
        }
        public async Task<FornecedorModel> AddSupplier(FornecedorModel fornecedor)
        {
            if (fornecedor.Cep.Length < 8 || (fornecedor.Cnpj_Cpf.Length > 0 && fornecedor.Cnpj_Cpf.Length < 14))
            {
                throw new Exception("Preencher o campo corretamente");
            }

            await _dbContext.AddAsync(fornecedor);
            await _dbContext.SaveChangesAsync();

            return fornecedor;
        }

        public async Task<bool> DeleteSupplier(int id)
        {
            FornecedorModel fornecedorById = await GetSupplierById(id);

            if (fornecedorById == null)
            {
                throw new Exception($"Empresa não foi encontrada no banco de dados.");
            }

            _dbContext.Fornecedores.Remove(fornecedorById);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<FornecedorModel>> GetAllData()
        {
            return await _dbContext.Fornecedores.ToListAsync();
        }

        public async Task<FornecedorModel> GetSupplierById(int id)
        {
            return await _dbContext.Fornecedores.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<FornecedorModel> UpdateSupplier(FornecedorModel fornecedor, int id)
        {
            FornecedorModel fornecedorById = await GetSupplierById(id);

            if (fornecedorById == null)
            {
                throw new Exception($"Usuário para o ID:{id} não foi encontrado no banco de dados.");
            }
            if (fornecedor.Cep.Length < 8 || (fornecedor.Cnpj_Cpf.Length > 0 && fornecedor.Cnpj_Cpf.Length < 14))
            {
                throw new Exception("Preencher o campo corretamente");
            }

            fornecedorById.Cnpj_Cpf = fornecedor.Cnpj_Cpf;
            fornecedorById.NmFornecedor= fornecedor.NmFornecedor;
            fornecedorById.Email= fornecedor.Email;
            fornecedorById.Cep = fornecedor.Cep;

            _dbContext.Fornecedores.Update(fornecedorById);
            await _dbContext.SaveChangesAsync();

            return fornecedorById;
        }
    }
}
