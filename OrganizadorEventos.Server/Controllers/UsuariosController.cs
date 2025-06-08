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

//GET{id}
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
}