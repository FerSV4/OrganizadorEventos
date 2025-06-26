import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventoService } from '../evento.service';
import { Evento } from '../../models/evento.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.interface';
import { FavoritosService } from '../../services/favoritos.service';

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
  eventosFavoritosIds: number[] = [];

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit(): void {
    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario;
      if (usuario) {
        this.cargarEventosInscritos(usuario.usuarioId);
        this.cargarFavoritos();
      } else {
        this.eventosInscritosIds = [];
        this.eventosFavoritosIds = [];
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

  cargarFavoritos(): void {
    if (this.usuarioActual) {
      this.favoritosService.obtenerFavoritos(this.usuarioActual.usuarioId).subscribe(eventos => {
        this.eventosFavoritosIds = eventos.map(e => e.eventoId);
      });
    }
  }
  
  inscribirse(eventoId: number): void {
    if (!this.usuarioActual) {
      alert('Debes iniciar sesión para inscribirte a un evento.');
      return;
    }
    if (confirm('¿Estás seguro de que quieres inscribirte a este evento?')) {
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
  }

  marcarComoFavorito(eventoId: number): void {
    if (!this.usuarioActual) return;
    this.favoritosService.agregarFavorito(this.usuarioActual.usuarioId, eventoId).subscribe(() => {
      this.cargarFavoritos(); 
    });
  }

  quitarDeFavoritos(eventoId: number): void {
    if (!this.usuarioActual) return;
    this.favoritosService.quitarFavorito(this.usuarioActual.usuarioId, eventoId).subscribe(() => {
      this.cargarFavoritos();
    });
  }

  esFavorito(eventoId: number): boolean {
    return this.eventosFavoritosIds.includes(eventoId);
  }
  
  estaInscrito(eventoId: number): boolean {
    return this.eventosInscritosIds.includes(eventoId);
  }

  esCreador(evento: Evento): boolean {
    return this.usuarioActual?.usuarioId === evento.creadorId;
  }
}
