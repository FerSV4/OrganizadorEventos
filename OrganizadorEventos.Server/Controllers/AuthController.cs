using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using OrganizadorEventos.Server.Models;
    using System.Threading.Tasks;
    
    [ApiController]
    [Route("api/[controller]")] 
    public class AuthController : ControllerBase
    {
        private readonly OrganizadorEventosContext _context;
    
        public AuthController(OrganizadorEventosContext context)
        {
            _context = context;
        }
    
        // POST: api/Auth/register
        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> Register(Usuario usuario)
        {

            if (await _context.Usuarios.AnyAsync(u => u.Correo == usuario.Correo))
            {
                return BadRequest("El correo electrónico ya está registrado.");
            }
    
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
    

            return Ok(usuario);
        }
    
        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> Login(LoginDto loginDto)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == loginDto.Correo && u.Password == loginDto.Password);
    
            if (usuario == null)
            {

                return Unauthorized("Correo o contraseña incorrectos.");
            }
            return Ok(usuario);
        }
    }
    