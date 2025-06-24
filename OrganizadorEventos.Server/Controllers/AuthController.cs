using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Models;
using OrganizadorEventos.Server.Services;

namespace OrganizadorEventos.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UsuarioService _servicioUsuario;

        public AuthController(UsuarioService servicioUsuario)
        {
            _servicioUsuario = servicioUsuario;
        }

        [HttpPost("register")]
        public ActionResult<Usuario> Register(Usuario usuario)
        {
            var usuarioRegistrado = _servicioUsuario.RegistrarUsuario(usuario);
            if (usuarioRegistrado == null)
            {
                return BadRequest("Ya existe ese correo");
            }
            return Ok(usuarioRegistrado);
        }

        [HttpPost("login")]
        public ActionResult<Usuario> Login(LoginDto loginDto)
        {
            var usuario = _servicioUsuario.Login(loginDto);
            if (usuario == null)
            {
                return Unauthorized("Credenciales incorrectas");
            }
            return Ok(usuario);
        }
    }
}