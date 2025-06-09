import { Component, OnInit } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { Router, RouterLink } from '@angular/router';
    import { EventoService } from '../../eventos/evento.service';
    import { AuthService } from '../../services/auth.service';
    import { Evento } from '../../models/evento.model';
    import { Usuario } from '../../models/usuario.interface';
    
    @Component({
      selector: 'app-mis-eventos',
      standalone: true,
      imports: [CommonModule, RouterLink],
      templateUrl: './mis-eventos.component.html',
    })
    export class MisEventosComponent implements OnInit {
    
      eventosInscrito: Evento[] = [];
      usuarioActual: Usuario | null = null;
    
      constructor(
        private eventoService: EventoService,
        private authService: AuthService,
        private router: Router
      ) {}
    
      ngOnInit(): void {

        this.usuarioActual = this.authService.getUsuarioLogueado();
    
        if (!this.usuarioActual) {

          alert('Debes iniciar sesión para ver tus eventos registrados.');
          this.router.navigate(['/login']);
          return;
        }
    

        this.cargarMisEventos();
      }
    
      cargarMisEventos(): void {
        if (this.usuarioActual) {
          this.eventoService.getEventosPorUsuario(this.usuarioActual.usuarioId).subscribe({
            next: (eventos) => {
              this.eventosInscrito = eventos;
            },
            error: () => console.error('Error al cargar los eventos')
          });
        }
      }
    
      eliminarEvento(id: number): void {
        if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
          this.eventoService.deleteEvento(id).subscribe({
            next: () => {
              alert('Evento eliminado');

              this.cargarMisEventos();
            },
            error: () => {
              alert('No se pudo eliminar el evento.');
            }
          });
        }
      }
    }