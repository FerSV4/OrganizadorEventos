using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;
using System.Collections.Generic;
using System.Linq;

namespace OrganizadorEventos.Server.Services
{
    public class UsuarioService
    {
        private readonly OrganizadorEventosContext _context;

        public UsuarioService(OrganizadorEventosContext context)
        {
            _context = context;
        }

        public Usuario? ObtenerUsuarioPorId(int id)
        {
            return _context.Usuarios.Find(id);
        }

        public Usuario? RegistrarUsuario(Usuario usuario)
        {
            if (_context.Usuarios.Any(u => u.Correo == usuario.Correo))
            {
                return null;
            }
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
            return usuario;
        }

        public Usuario? Login(LoginDto loginDto)
        {
            return _context.Usuarios
                .FirstOrDefault(u => u.Correo == loginDto.Correo && u.Password == loginDto.Password);
        }

        public IEnumerable<Evento> ObtenerInscripcionesDeUsuario(int usuarioId)
        {
            var eventos = _context.ParticipanteEventos
                .Where(p => p.UsuarioId == usuarioId)
                .AsNoTracking()
                .Include(p => p.Evento)
                .ThenInclude(e => e.Creador)
                .Select(p => p.Evento)
                .ToList();

            foreach (var evento in eventos)
            {
                if (evento.Creador != null)
                {
                    evento.CreadorNombreUsuario = evento.Creador.NombreUsuario;
                }
            }
            return eventos;
        }

        public IEnumerable<Evento> ObtenerEventosCreadosPorUsuario(int usuarioId)
        {
            var usuario = _context.Usuarios.Find(usuarioId);
            if (usuario == null)
            {
                return new List<Evento>();
            }
            
            var eventosCreados = _context.Eventos
                .Where(evento => evento.CreadorId == usuarioId)
                .AsNoTracking()
                .ToList();
            
            foreach (var evento in eventosCreados)
            {
                evento.CreadorNombreUsuario = usuario.NombreUsuario;
            }
            return eventosCreados;
        }
    }
}