import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventoService } from '../evento.service';
import { Evento } from '../../models/evento.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evento-list.component.html',
})
export class EventoListComponent implements OnInit {
  eventos$: Observable<Evento[]> | undefined;
  usuarioActual: Usuario | null = null;
  eventosInscritosIds: number[] = [];

  constructor(private eventoService: EventoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario;
      if (usuario) {
        this.cargarEventosInscritos(usuario.usuarioId);
      }
    });
    this.loadEventos();
  }

  loadEventos(): void {
    this.eventos$ = this.eventoService.getEventos();
  }
  
  cargarEventosInscritos(usuarioId: number): void {
    this.eventoService.getEventosPorUsuario(usuarioId).subscribe(eventos => {
      this.eventosInscritosIds = eventos.map(e => e.eventoId);
    });
  }
  
  inscribirse(eventoId: number): void {
    if (!this.usuarioActual) {
      alert('Debes iniciar sesión para inscribirte a un evento.');
      return;
    }
    
    this.eventoService.inscribirseAEvento(eventoId, this.usuarioActual.usuarioId).subscribe({
      next: (response) => {
        alert(response);
        this.cargarEventosInscritos(this.usuarioActual!.usuarioId);
      },
      error: (err) => {

        alert(`Error al inscribirse: ${err.error}`);
      }
    });
  }
  
  estaInscrito(eventoId: number): boolean {
    return this.eventosInscritosIds.includes(eventoId);
  }
  

  esCreador(evento: Evento): boolean {
    return this.usuarioActual?.usuarioId === evento.creadorId;
  }
}