using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OrganizadorEventos.Server.Services
{
    public class EventoService
    {
        private readonly OrganizadorEventosContext _context;

        public EventoService(OrganizadorEventosContext context)
        {
            _context = context;
        }

        public IEnumerable<Evento> ObtenerTodosLosEventos()
        {
            var eventos = _context.Eventos
                .Include(e => e.Creador)
                .AsNoTracking()
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

        public Evento? ObtenerEventoPorId(int id)
        {
            var evento = _context.Eventos
                .Include(e => e.Creador)
                .AsNoTracking()
                .FirstOrDefault(e => e.EventoId == id);
            
            if (evento != null && evento.Creador != null)
            {
                evento.CreadorNombreUsuario = evento.Creador.NombreUsuario;
            }
            
            return evento;
        }

        public Evento CrearEvento(Evento evento)
        {
            _context.Eventos.Add(evento);
            _context.SaveChanges();
            return evento;
        }

        public bool ActualizarEvento(int id, Evento evento)
        {
            if (id != evento.EventoId)
            {
                return false;
            }
            _context.Entry(evento).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Eventos.Any(e => e.EventoId == id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
            return true;
        }

        public bool EliminarEvento(int id)
        {
            var evento = _context.Eventos.Find(id);
            if (evento == null)
            {
                return false;
            }
            _context.Eventos.Remove(evento);
            _context.SaveChanges();
            return true;
        }

        public string InscribirUsuarioAEvento(int eventoId, int usuarioId)
        {
            var participante = new ParticipanteEvento
            {
                EventoId = eventoId,
                UsuarioId = usuarioId,
                FechaInscripcion = DateTime.UtcNow
            };
            _context.ParticipanteEventos.Add(participante);
            _context.SaveChanges();
            return "Inscripción exitosa.";
        }

        public bool CancelarInscripcion(int eventoId, int usuarioId)
        {
            var inscripcion = _context.ParticipanteEventos
                .FirstOrDefault(p => p.EventoId == eventoId && p.UsuarioId == usuarioId);

            if (inscripcion == null)
            {
                return false;
            }

            _context.ParticipanteEventos.Remove(inscripcion);
            _context.SaveChanges();
            return true;
        }
    }
}