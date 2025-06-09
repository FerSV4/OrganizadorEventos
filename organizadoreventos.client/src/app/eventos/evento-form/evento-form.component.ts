import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../evento.service';
import { Evento } from '../../models/evento.model';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evento-form.component.html',
})
export class EventoFormComponent implements OnInit {

  evento: Evento = {
    eventoId: 0,
    titulo: '',
    descripcion: '',
    fecha: new Date(),
    lugar: '',
    creadorId: 0,
    estado: true
  };
  usuarioActual: Usuario | null = null;
  isEditMode = false;
  private eventoId: number | null = null;

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.usuarioActual$.subscribe(usuario => {
        this.usuarioActual = usuario;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.isEditMode = true;
      this.eventoId = +idParam;
      this.eventoService.getEvento(this.eventoId).subscribe(data => {
        data.fecha = this.formatDateForInput(data.fecha);
        if (data.fechaFin) {
            data.fechaFin = this.formatDateForInput(data.fechaFin);
        }
        this.evento = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.eventoId) {
      this.eventoService.updateEvento(this.eventoId, this.evento).subscribe(() => {
        alert('Evento actualizado con éxito');
        this.router.navigate(['/mis-eventos-creados']);
      });
    } else {
      if (this.usuarioActual) {
        this.evento.creadorId = this.usuarioActual.usuarioId;
        this.eventoService.createEvento(this.evento).subscribe(() => {
          alert('Evento creado con éxito');
          this.router.navigate(['/eventos']);
        });
      } else {
        alert('Error: Debes iniciar sesión para crear un evento.');
        this.router.navigate(['/login']);
      }
    }
  }

  private formatDateForInput(date: any): any {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }
}