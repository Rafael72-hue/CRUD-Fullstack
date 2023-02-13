using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositorios.Interfaces;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly IEmpresaRepositorio _empresaRepositorio;
        public EmpresaController(IEmpresaRepositorio empresaRepositorio)
        {
            _empresaRepositorio = empresaRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<EmpresaModel>>> GetAllData()
        {
            List<EmpresaModel> empresa = await _empresaRepositorio.GetAllData();
            return Ok(empresa);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmpresaModel>> GetCompanyById(int id)
        {
            EmpresaModel empresa = await _empresaRepositorio.GetCompanyById(id);
            return Ok(empresa);
        }

        [HttpPost]
        public async Task<ActionResult<EmpresaModel>> AddCompany([FromBody] EmpresaModel empresaModel)
        {
            EmpresaModel empresa = await _empresaRepositorio.AddCompany(empresaModel);
            return Ok(empresa);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EmpresaModel>> UpdateCompany([FromBody] EmpresaModel empresaModel, int id)
        {
            empresaModel.Id = id;
            EmpresaModel empresa = await _empresaRepositorio.UpdateCompany(empresaModel, id);
            return Ok(empresa);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<EmpresaModel>> DeleteCompany(int id)
        {
            bool apagado = await _empresaRepositorio.DeleteCompany(id);
            return Ok(apagado);
        }
    }
}
