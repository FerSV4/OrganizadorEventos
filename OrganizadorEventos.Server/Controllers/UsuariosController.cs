using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Models;
using OrganizadorEventos.Server.Services;
using System.Collections.Generic;

namespace OrganizadorEventos.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _servicioUsuario;

        public UsuariosController(UsuarioService servicioUsuario)
        {
            _servicioUsuario = servicioUsuario;
        }

        [HttpGet("{id}")]
        public ActionResult<Usuario> GetUsuario(int id)
        {
            var usuario = _servicioUsuario.ObtenerUsuarioPorId(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [HttpGet("{id}/inscripciones")]
        public ActionResult<IEnumerable<Evento>> GetInscripcionesUsuario(int id)
        {
            var eventos = _servicioUsuario.ObtenerInscripcionesDeUsuario(id);
            return Ok(eventos);
        }

        [HttpGet("{id}/eventosCreados")]
        public ActionResult<IEnumerable<Evento>> GetEventosCreados(int id)
        {
            var eventos = _servicioUsuario.ObtenerEventosCreadosPorUsuario(id);
            return Ok(eventos);
        }
    }
}