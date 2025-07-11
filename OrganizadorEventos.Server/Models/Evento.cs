namespace OrganizadorEventos.Server.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using System.Text.Json.Serialization;

public class Evento
{
    public int EventoId { get; set; }
    [Required]
    public string Titulo { get; set; }
    [Required]
    public string Descripcion { get; set; }
    [Required]
    public DateTime Fecha { get; set; }
    [Required]
    public string Lugar { get; set; }
    public bool Estado { get; set; } = true;
    public DateTime? FechaFin { get; set; }
    public int? Capacidad { get; set; }
    public decimal? Precio { get; set; }
    public int CreadorId { get; set; }

    [NotMapped]
    public string? CreadorNombreUsuario { get; set; }

    public virtual Usuario? Creador { get; set; } 

    [JsonIgnore]
    public virtual ICollection<ParticipanteEvento> Participantes { get; set; } = new List<ParticipanteEvento>();
}