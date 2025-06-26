namespace OrganizadorEventos.Server.Models
{
    public class EventoFavorito
    {
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public int EventoId { get; set; }
        public virtual Evento Evento { get; set; }
    }
}