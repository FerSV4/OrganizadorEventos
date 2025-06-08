
namespace OrganizadorEventos.Server.Models;

public class ParticipanteEvento
{

    public int UsuarioId { get; set; }
    public int EventoId { get; set; }

    public DateTime FechaInscripcion { get; set; }


    public virtual Usuario Usuario { get; set; } = null!;
    public virtual Evento Evento { get; set; } = null!;
}