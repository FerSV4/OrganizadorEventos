namespace OrganizadorEventos.Server.Models;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Usuario
{
    public int UsuarioId { get; set; } 

    [Required]
    public string NombreUsuario { get; set; }

    [Required]
    public string NombreCompleto { get; set; }

    public DateTime FechaNacimiento { get; set; }
    public string? Direccion { get; set; } 

    [Required]
    [EmailAddress]
    public string Correo { get; set; }

    [Required]
    public string Password { get; set; } 

    [JsonIgnore]
    public virtual ICollection<Evento> EventosCreados { get; set; } = new List<Evento>();

    [JsonIgnore]
    public virtual ICollection<ParticipanteEvento> Participaciones { get; set; } = new List<ParticipanteEvento>();
}