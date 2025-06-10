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
      imports: [CommonModule],
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
            }
          });
        }
      }
      cancelarInscripcion(eventoId: number): void {
        if (!this.usuarioActual) return;
    
        if (confirm('¿Quieres cancelar la incripcion?')) {
          this.eventoService.cancelarInscripcion(eventoId, this.usuarioActual.usuarioId).subscribe({
            next: () => {
              alert('Inscripción cancelada');
              this.cargarMisEventos(); 
            },
          });
        }
      }
    }