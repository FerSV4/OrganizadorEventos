import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../eventos/evento.service';
import { AuthService } from '../../services/auth.service';
import { Evento } from '../../models/evento.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-eventos-creados',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './mis-eventos-creados.component.html',
})
export class MisEventosCreadosComponent implements OnInit {
  eventos: Evento[] = []; 
  
  constructor(
    private eventoService: EventoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.usuarioActual$.subscribe(usuario => {
      if (usuario) {
        this.eventoService.getEventosCreadosPorUsuario(usuario.usuarioId)
          .subscribe(data => {
            this.eventos = data;
          });
      }
    });
  }
}