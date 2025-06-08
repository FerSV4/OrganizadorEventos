import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../evento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evento-form.component.html',
})
export class EventoFormComponent {
  eventoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router
  ) {
    this.eventoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      lugar: ['']
    });
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const nuevoEvento = { ...this.eventoForm.value, eventoId: 0, estado: true };
      this.eventoService.createEvento(nuevoEvento).subscribe({
        next: () => {
          alert('Evento creado exitosamente');
          this.router.navigate(['/eventos']);
        },
        error: (err) => console.error('Error al crear el evento', err)
      });
    }
  }
}