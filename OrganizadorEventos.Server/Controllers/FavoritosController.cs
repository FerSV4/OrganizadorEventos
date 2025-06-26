using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Services;

namespace OrganizadorEventos.Server.Controllers
{
    [ApiController]
    [Route("api/usuarios/{usuarioId}/favoritos")]
    public class FavoritosController : ControllerBase
    {
        private readonly FavoritosService _favoritosService;

        public FavoritosController(FavoritosService favoritosService)
        {
            _favoritosService = favoritosService;
        }

        [HttpGet]
        public IActionResult Get(int usuarioId)
        {
            return Ok(_favoritosService.ObtenerFavoritosPorUsuario(usuarioId));
        }

        [HttpPost("{eventoId}")]
        public IActionResult Post(int usuarioId, int eventoId)
        {
            var resultado = _favoritosService.MarcarFavorito(usuarioId, eventoId);
            if (!resultado) return Conflict("El evento ya está marcado como favorito.");
            return Ok();
        }

        [HttpDelete("{eventoId}")]
        public IActionResult Delete(int usuarioId, int eventoId)
        {
            var resultado = _favoritosService.QuitarFavorito(usuarioId, eventoId);
            if (!resultado) return NotFound();
            return NoContent();
        }
    }
}
