import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formularioRegistro: FormGroup;
  mensajeError: string | null = null;

  constructor(
    private creadorFormulario: FormBuilder,
    private servicioAuth: AuthService,
    private enrutador: Router
  ) {

    this.formularioRegistro = this.creadorFormulario.group({
      nombreUsuario: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: [''], 
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  enviarRegistro(): void {
    this.mensajeError = null; 

    if (this.formularioRegistro.invalid) {
      alert('Campos ingresados incorrectamente');
      return;
    }

    const datosUsuario = this.formularioRegistro.value;

    this.servicioAuth.register(datosUsuario).subscribe({
      next: (usuarioRegistrado) => {
        alert(`Usuario registrado Correctamente`);

        this.enrutador.navigate(['/login']);
      },
    });
  }
}