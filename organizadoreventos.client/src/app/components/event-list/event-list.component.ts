import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service'; 
import { Evento } from '../../models/evento.interface';     
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  
  eventos: Evento[] = [];
  constructor(private eventoService: EventoService) { }


  ngOnInit(): void {

    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
      },
    });
  }
}