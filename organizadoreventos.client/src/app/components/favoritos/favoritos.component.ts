import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Evento } from '../../models/evento.model';
import { Usuario } from '../../models/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favoritos.component.html',
})
export class FavoritosComponent implements OnInit {

  eventosFavoritos: Evento[] = [];
  usuarioActual: Usuario | null = null;
  cargando = true;

  constructor(
    private favoritosService: FavoritosService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUsuarioLogueado();
    if (this.usuarioActual) {
      this.cargarFavoritos();
    } else {
      alert('Necesita login');
      this.router.navigate(['/login']);
    }
  }

  cargarFavoritos(): void {
    if (this.usuarioActual) {
      this.cargando = true;
      this.favoritosService.obtenerFavoritos(this.usuarioActual.usuarioId).subscribe({
        next: (eventos) => {
          this.eventosFavoritos = eventos;
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
    }
  }

  quitarDeFavoritos(eventoId: number): void {
    if (confirm('Confirmacion')) {
      if (this.usuarioActual) {
        this.favoritosService.quitarFavorito(this.usuarioActual.usuarioId, eventoId).subscribe({
          next: () => {
            alert('Se quito el evento');
            this.cargarFavoritos();
          },
          error: () => {
          }
        });
      }
    }
  }
}
