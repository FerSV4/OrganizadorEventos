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
  eventos: Evento[] = []; 
  usuarioActual: Usuario | null = null;
  
  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUsuarioLogueado();

    if (this.usuarioActual) {
      this.cargarEventos();
    } else {
      alert('Debes iniciar sesión para ver esta página.');
      this.router.navigate(['/login']);
    }
  }

  cargarEventos(): void {
    if (this.usuarioActual) {
      this.eventoService.getEventosCreadosPorUsuario(this.usuarioActual.usuarioId)
        .subscribe(data => {
          this.eventos = data;
        });
    }
  }

  eliminarEvento(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      this.eventoService.deleteEvento(id).subscribe(() => {
        alert('Evento eliminado con éxito.');
        this.cargarEventos();
      });
    }
  }
}