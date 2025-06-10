import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EventoService } from '../evento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function VerRangoFechas(formulario: AbstractControl): ValidationErrors | null {
  const fechaInicio = formulario.get('fecha')?.value;
  const fechaFin = formulario.get('fechaFin')?.value;
  if (fechaInicio && fechaFin && new Date(fechaFin) < new Date(fechaInicio)) {
    return { FechaInvalida: true };
  }
  return null;
}

function VerCamposBlancos(control: AbstractControl): ValidationErrors | null {
    const esSoloEspacios = (control.value || '').trim().length === 0;
    return esSoloEspacios ? { 'CampoBlanco': true } : null;
}

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evento-form.component.html',
})
export class EventoFormComponent implements OnInit {
  
  formularioEvento: FormGroup;
  esModoEdicion = false;
  private idEventoActual: number | null = null;

  constructor(
    private creadorFormulario: FormBuilder,
    private servicioEvento: EventoService,
    private servicioAuth: AuthService,
    private enrutador: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.formularioEvento = this.creadorFormulario.group({
      titulo: ['', [Validators.required, VerCamposBlancos]],
      descripcion: ['', [Validators.required, VerCamposBlancos]],
      fecha: ['', Validators.required],
      lugar: [''],
      fechaFin: [null],
      capacidad: [null, [Validators.min(1)]],
      precio: [null, [Validators.min(0)]]
    }, { 
      validators: VerRangoFechas 
    });
  }

  ngOnInit(): void {
    const idParam = this.rutaActiva.snapshot.paramMap.get('id');
    if (idParam) {
      this.esModoEdicion = true;
      this.idEventoActual = +idParam;
      this.servicioEvento.getEvento(this.idEventoActual).subscribe(evento => {
        const eventoParaFormulario = {
          ...evento,
          fecha: this.formatearFechaParaInput(evento.fecha),
          fechaFin: evento.fechaFin ? this.formatearFechaParaInput(evento.fechaFin) : null
        };
        this.formularioEvento.patchValue(eventoParaFormulario);
      });
    }
  }

  private formatearFechaParaInput(fecha: any): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toISOString().substring(0, 16);
  }

  enviarFormulario(): void {
    const usuarioLogueado = this.servicioAuth.getUsuarioLogueado();
    if (!usuarioLogueado) {
      alert('Debes iniciar sesión para realizar esta acción.');
      this.enrutador.navigate(['/login']);
      return;
    }

    if (this.esModoEdicion && this.idEventoActual) {
      const eventoActualizado = { ...this.formularioEvento.value, eventoId: this.idEventoActual, creadorId: usuarioLogueado.usuarioId };
      this.servicioEvento.updateEvento(this.idEventoActual, eventoActualizado).subscribe(() => {
        alert('Evento actualizado exitosamente');
        this.enrutador.navigate(['/mis-eventos-creados']);
      });
    } else {
      const nuevoEvento = { ...this.formularioEvento.value, creadorId: usuarioLogueado.usuarioId };
      this.servicioEvento.createEvento(nuevoEvento).subscribe(() => {
        alert('Evento creado exitosamente');
        this.enrutador.navigate(['/eventos']);
      });
    }
  }
}
