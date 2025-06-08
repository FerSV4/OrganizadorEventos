
namespace OrganizadorEventos.Server.Models;
using Microsoft.EntityFrameworkCore;

public class OrganizadorEventosContext : DbContext
{
    public OrganizadorEventosContext(DbContextOptions<OrganizadorEventosContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Evento> Eventos { get; set; }
    public DbSet<ParticipanteEvento> ParticipanteEventos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Evento>()
            .HasOne(e => e.Creador) 
            .WithMany(u => u.EventosCreados) 
            .HasForeignKey(e => e.CreadorId) 
            .OnDelete(DeleteBehavior.Restrict); 

        modelBuilder.Entity<ParticipanteEvento>()
            .HasKey(pe => new { pe.UsuarioId, pe.EventoId });


        modelBuilder.Entity<ParticipanteEvento>()
            .HasOne(pe => pe.Usuario)
            .WithMany(u => u.Participaciones)
            .HasForeignKey(pe => pe.UsuarioId)
            .OnDelete(DeleteBehavior.Cascade); 

        modelBuilder.Entity<ParticipanteEvento>()
            .HasOne(pe => pe.Evento)
            .WithMany(e => e.Participantes)
            .HasForeignKey(pe => pe.EventoId)
            .OnDelete(DeleteBehavior.Cascade); 
    }
}