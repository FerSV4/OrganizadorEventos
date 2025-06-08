using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;
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

//GET
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Evento>>> GetEventos()
    {

        var eventos = await _context.Eventos.AsNoTracking().ToListAsync();
        return Ok(eventos); 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Evento>> GetEvento(int id)
    {

        var evento = await _context.Eventos.FindAsync(id);

        if (evento == null)
        {

            return NotFound();
        }

        return Ok(evento);
    }

//POST
    [HttpPost]
    public async Task<ActionResult<Evento>> PostEvento(Evento evento)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Eventos.Add(evento);
        await _context.SaveChangesAsync(); 

        return CreatedAtAction(nameof(GetEvento), new { id = evento.EventoId }, evento);
    }

//PUT
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

//DELETE
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