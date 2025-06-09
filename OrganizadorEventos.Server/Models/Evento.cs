namespace OrganizadorEventos.Server.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Evento
{
    public int EventoId { get; set; }

    [Required]
    public string Titulo { get; set; }

    [Required]
    public string Descripcion { get; set; }

    [Required]
    public DateTime Fecha { get; set; }

    public string? Lugar { get; set; }

    public bool Estado { get; set; } = true;

    public DateTime? FechaFin { get; set; }
    
    public int? Capacidad { get; set; }

    public decimal? Precio { get; set; }

    public int CreadorId { get; set; }

    public virtual Usuario? Creador { get; set; }

    public virtual ICollection<ParticipanteEvento> Participantes { get; set; } = new List<ParticipanteEvento>();
}