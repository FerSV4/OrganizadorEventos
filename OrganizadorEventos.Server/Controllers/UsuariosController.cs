using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly OrganizadorEventosContext _context;

    public UsuariosController(OrganizadorEventosContext context)
    {
        _context = context;
    }

    // POST USER
    [HttpPost]
    public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUsuario), new { id = usuario.UsuarioId }, usuario);
    }

    // GET USER
    [HttpGet("{id}")]
    public async Task<ActionResult<Usuario>> GetUsuario(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
        {
            return NotFound();
        }
        return Ok(usuario);
    }

    [HttpGet("{id}/inscripciones")]
    public async Task<ActionResult<IEnumerable<Evento>>> GetInscripcionesUsuario(int id)
    {
        var eventos = await _context.ParticipanteEventos
            .Where(p => p.UsuarioId == id)
            .AsNoTracking()
            .Include(p => p.Evento)
                .ThenInclude(e => e.Creador)
            .Select(p => p.Evento)
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

    [HttpGet("{id}/eventosCreados")]
    public async Task<ActionResult<IEnumerable<Evento>>> GetEventosCreados(int id)
    {
        var usuario = await _context.Usuarios
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.UsuarioId == id);
            
        if (usuario == null)
        {
            return NotFound("El usuario no existe.");
        }

        var eventosCreados = await _context.Eventos
            .Where(evento => evento.CreadorId == id)
            .AsNoTracking()
            .ToListAsync();

        foreach (var evento in eventosCreados)
        {
            evento.CreadorNombreUsuario = usuario.NombreUsuario;
        }

        return Ok(eventosCreados);
    }
}