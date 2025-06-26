using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;
using System.Collections.Generic;
using System.Linq;

namespace OrganizadorEventos.Server.Services
{
    public class FavoritosService
    {
        private readonly OrganizadorEventosContext _context;

        public FavoritosService(OrganizadorEventosContext context)
        {
            _context = context;
        }

        public IEnumerable<Evento> ObtenerFavoritosPorUsuario(int usuarioId)
        {
            return _context.EventosFavoritos
                .Where(f => f.UsuarioId == usuarioId)
                .Select(f => f.Evento)
                .ToList();
        }

        public bool MarcarFavorito(int usuarioId, int eventoId)
        {

            var yaExiste = _context.EventosFavoritos.Any(f => f.UsuarioId == usuarioId && f.EventoId == eventoId);
            if (yaExiste) return false;

            var favorito = new EventoFavorito { UsuarioId = usuarioId, EventoId = eventoId };
            _context.EventosFavoritos.Add(favorito);
            _context.SaveChanges();
            return true;
        }

        public bool QuitarFavorito(int usuarioId, int eventoId)
        {
            var favorito = _context.EventosFavoritos
                .FirstOrDefault(f => f.UsuarioId == usuarioId && f.EventoId == eventoId);
            
            if (favorito == null) return false;

            _context.EventosFavoritos.Remove(favorito);
            _context.SaveChanges();
            return true;
        }
    }
}