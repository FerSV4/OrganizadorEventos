import { Component, OnInit } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { Router, RouterLink } from '@angular/router';
    import { EventoService } from '../../eventos/evento.service';
    import { AuthService } from '../../services/auth.service';
    import { Evento } from '../../models/evento.model';
    import { Usuario } from '../../models/usuario.interface';
    
    @Component({
      selector: 'app-mis-eventos-creados',
      standalone: true,
      imports: [CommonModule, RouterLink],
      templateUrl: './mis-eventos-creados.component.html',
    })
    export class MisEventosCreadosComponent implements OnInit {
    
      eventosCreados: Evento[] = [];
      usuarioActual: Usuario | null = null;
    
      constructor(
        private eventoService: EventoService,
        private authService: AuthService,
        private router: Router
      ) {}
    
      ngOnInit(): void {
        this.usuarioActual = this.authService.getUsuarioLogueado();
    
        if (!this.usuarioActual) {
          alert('Debes iniciar sesión para ver los eventos que has creado.');
          this.router.navigate(['/login']);
          return;
        }
        
        this.cargarEventosCreados();
      }
    
      cargarEventosCreados(): void {
        if (this.usuarioActual) {
          this.eventoService.getEventosCreadosPorUsuario(this.usuarioActual.usuarioId).subscribe({
            next: (eventos) => {
              this.eventosCreados = eventos;
            },
            error: () => console.error('Error al cargar los eventos')
          });
        }
      }
    
      eliminarEvento(id: number): void {
        if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
          this.eventoService.deleteEvento(id).subscribe({
            next: () => {
              alert('Evento eliminado con éxito.');
              this.cargarEventosCreados(); // Recargamos la lista
            },
            error: (err) => alert('No se pudo eliminar el evento.')
          });
        }
      }
    }