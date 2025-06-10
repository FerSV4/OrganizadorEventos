using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class EventosController : ControllerBase
{
    private readonly OrganizadorEventosContext _context;

    public EventosController(OrganizadorEventosContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Evento>>> GetEventos()
    {
        var eventos = await _context.Eventos
                                    .Include(e => e.Creador)
                                    .AsNoTracking()
                                    .ToListAsync();

        foreach (var evento in eventos)
        {
            if (evento.Creador != null)
            {
                evento.CreadorNombreUsuario = evento.Creador.NombreUsuario;
            }
        }

        return Ok(eventos);
    }

    //GET eventos por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Evento>> GetEvento(int id)
    {
        var evento = await _context.Eventos
                                   .Include(e => e.Creador)
                                   .AsNoTracking()
                                   .FirstOrDefaultAsync(e => e.EventoId == id);

        if (evento == null)
        {
            return NotFound();
        }

        if (evento.Creador != null)
        {
            evento.CreadorNombreUsuario = evento.Creador.NombreUsuario;
        }

        return Ok(evento);
    }
    
    //POST crear evento
    [HttpPost]
    public async Task<ActionResult<Evento>> PostEvento(Evento evento)
    {
        _context.Eventos.Add(evento);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEvento), new { id = evento.EventoId }, evento);
    }

    [HttpPost("{id}/inscribir")]
    public async Task<IActionResult> InscribirUsuario(int id, [FromBody] int usuarioId)
    {
        var participante = new ParticipanteEvento
        {
            EventoId = id,
            UsuarioId = usuarioId,
            FechaInscripcion = DateTime.UtcNow
        };
        _context.ParticipanteEventos.Add(participante);
        await _context.SaveChangesAsync();
        return Ok("Inscripción exitosa.");
    }

    //PUT edicion de evento
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEvento(int id, Evento evento)
    {
        if (id != evento.EventoId)
        {
            return BadRequest();
        }

        _context.Entry(evento).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Eventos.Any(e => e.EventoId == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    //DELETE cancelar inscripcion al evento
    [HttpDelete("{eventoId}/inscripcion/{usuarioId}")]
    public async Task<IActionResult> CancelarInscripcion(int eventoId, int usuarioId)
    {
        var inscripcion = await _context.ParticipanteEventos
            .FirstOrDefaultAsync(p => p.EventoId == eventoId && p.UsuarioId == usuarioId);
        
        if (inscripcion != null)
        {
            _context.ParticipanteEventos.Remove(inscripcion);
            await _context.SaveChangesAsync();
        }
        
        return NoContent();
    }
    
    //DELETE eliminar evento
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvento(int id)
    {
        var evento = await _context.Eventos.FindAsync(id);
        if (evento == null)
        {
            return NotFound();
        }
        _context.Eventos.Remove(evento);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}