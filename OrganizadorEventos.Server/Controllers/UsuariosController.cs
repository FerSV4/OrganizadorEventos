using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;
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

//POST USER
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

//GET
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
    // GET inscripciones

    [HttpGet("{id}/inscripciones")]
    public async Task<ActionResult<IEnumerable<Evento>>> GetInscripcionesUsuario(int id)
    {

        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
        {
            return NotFound("El usuario no existe.");
        }


        var eventosInscritos = await _context.ParticipanteEventos
            .Where(p => p.UsuarioId == id)
            .Select(p => p.Evento)
            .ToListAsync(); 

        return Ok(eventosInscritos);
}
// GET:eventosCreados

    [HttpGet("{id}/eventosCreados")]
    public async Task<ActionResult<IEnumerable<Evento>>> GetEventosCreados(int id)
    {

        var eventosCreados = await _context.Eventos
            .Where(evento => evento.CreadorId == id)
            .AsNoTracking()
            .ToListAsync();

        if (eventosCreados == null)
        {
            return Ok(new List<Evento>());
        }

        return Ok(eventosCreados);
    }

}