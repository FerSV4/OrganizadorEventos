import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EventoService } from '../evento.service';
import { Router } from '@angular/router';

function validarRangoFechas(formulario: AbstractControl): ValidationErrors | null {
  const fechaInicio = formulario.get('fecha')?.value;
  const fechaFin = formulario.get('fechaFin')?.value;

  if (fechaInicio && fechaFin && new Date(fechaFin) < new Date(fechaInicio)) {

    return { rangoFechasInvalido: true };
  }
  
  return null;
}

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evento-form.component.html',
})
export class EventoFormComponent {

  formularioEvento: FormGroup;

  constructor(
    private creadorFormulario: FormBuilder,
    private servicioEvento: EventoService,
    private enrutador: Router
  ) {

    this.formularioEvento = this.creadorFormulario.group({

      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],

      lugar: [''],
      fechaFin: [null], 
      capacidad: [null, Validators.min(1)], 
      precio: [null, Validators.min(0)]     
    }, { 
      validators: validarRangoFechas 
    });
  }

  enviarFormulario(): void {
   
    if (this.formularioEvento.invalid) {
      alert('Por favor, revisa los datos del formulario. Hay campos con errores.');
      return; 
    }
    const datosDelFormulario = this.formularioEvento.value;

    this.servicioEvento.createEvento(datosDelFormulario).subscribe({
      next: (eventoCreado) => {
        alert(`El evento "${eventoCreado.titulo}" ha sido creado`);
        this.enrutador.navigate(['/eventos']);
      },
    });
  }
}