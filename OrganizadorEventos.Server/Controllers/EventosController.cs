
using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Models;
using OrganizadorEventos.Server.Services;
using System.Collections.Generic;

namespace OrganizadorEventos.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly EventoService _servicioEvento;

        public EventosController(EventoService servicioEvento)
        {
            _servicioEvento = servicioEvento;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Evento>> GetEventos()
        {
            var eventos = _servicioEvento.ObtenerTodosLosEventos();
            return Ok(eventos);
        }

        [HttpGet("{id}")]
        public ActionResult<Evento> GetEvento(int id)
        {
            var evento = _servicioEvento.ObtenerEventoPorId(id);
            if (evento == null)
            {
                return NotFound();
            }
            return Ok(evento);
        }

        [HttpPost]
        public ActionResult<Evento> PostEvento(Evento evento)
        {
            var eventoCreado = _servicioEvento.CrearEvento(evento);
            return CreatedAtAction(nameof(GetEvento), new { id = eventoCreado.EventoId }, eventoCreado);
        }

        [HttpPost("{id}/inscribir")]
        public IActionResult InscribirUsuario(int id, [FromBody] int usuarioId)
        {
            var mensaje = _servicioEvento.InscribirUsuarioAEvento(id, usuarioId);
            return Ok(mensaje);
        }

        [HttpPut("{id}")]
        public IActionResult PutEvento(int id, Evento evento)
        {
            var resultado = _servicioEvento.ActualizarEvento(id, evento);
            if (!resultado)
            {
                return BadRequest();
            }
            return NoContent();
        }

        [HttpDelete("{eventoId}/inscripcion/{usuarioId}")]
        public IActionResult CancelarInscripcion(int eventoId, int usuarioId)
        {
            var resultado = _servicioEvento.CancelarInscripcion(eventoId, usuarioId);
            if (!resultado)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvento(int id)
        {
            var resultado = _servicioEvento.EliminarEvento(id);
            if (!resultado)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}