import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventoService } from '../evento.service';
import { Evento } from '../../models/evento.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evento-list.component.html',
})
export class EventoListComponent implements OnInit {
  eventos$: Observable<Evento[]> | undefined;

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.loadEventos();
  }

  loadEventos(): void {
    this.eventos$ = this.eventoService.getEventos();
  }

  deleteEvento(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      this.eventoService.deleteEvento(id).subscribe({
        next: () => {
          alert('Evento eliminado');
          this.loadEventos();
        },
        error: (err) => console.error('Error al eliminar evento', err)
      });
    }
  }
}