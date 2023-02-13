using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositorios.Interfaces;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedorController : ControllerBase
    {
        private readonly IFornecedorRepositorio _fornecedorRepositorio;
        public FornecedorController(IFornecedorRepositorio fornecedorRepositorio)
        {
            _fornecedorRepositorio = fornecedorRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<FornecedorModel>>> GetAllData()
        {
            List<FornecedorModel> fornecedor = await _fornecedorRepositorio.GetAllData();
            return Ok(fornecedor);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FornecedorModel>> GetSupplierById(int id)
        {
            FornecedorModel fornecedor = await _fornecedorRepositorio.GetSupplierById(id);
            return Ok(fornecedor);
        }

        [HttpPost]
        public async Task<ActionResult<FornecedorModel>> AddSupplier([FromBody] FornecedorModel fornecedorModel)
        {
            FornecedorModel fornecedor = await _fornecedorRepositorio.AddSupplier(fornecedorModel);
            return Ok(fornecedor);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<FornecedorModel>> UpdateSupplier([FromBody] FornecedorModel fornecedorModel, int id)
        {
            fornecedorModel.Id = id;
            FornecedorModel fornecedor = await _fornecedorRepositorio.UpdateSupplier(fornecedorModel, id);
            return Ok(fornecedor);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<FornecedorModel>> DeleteSupplier(int id)
        {
            bool apagado = await _fornecedorRepositorio.DeleteSupplier(id);
            return Ok(apagado);
        }
    }
}
