import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

function VerCamposBlancos(control: AbstractControl): ValidationErrors | null {
    const CampoInvalido = (control.value || '').trim().length === 0;
    return CampoInvalido ? { 'soloEspacios': true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  FormRegistro: FormGroup;
  Errormsg: string | null = null;

  constructor(
    private creadorFormulario: FormBuilder,
    private servicioAuth: AuthService,
    private enrutador: Router
  ) {

    this.FormRegistro = this.creadorFormulario.group({
      nombreUsuario: ['', [Validators.required, VerCamposBlancos]],
      nombreCompleto: ['', [Validators.required, VerCamposBlancos]],
      fechaNacimiento: ['', Validators.required],
      direccion: [''], 
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), VerCamposBlancos]]
    });
  }

  enviarRegistro(): void {
    this.Errormsg = null; 

    if (this.FormRegistro.invalid) {
      alert('Revisa los datos ingresados.');
      return;
    }

    const datosUsuario = this.FormRegistro.value;

    this.servicioAuth.register(datosUsuario).subscribe({
      next: () => {
        alert(`Registro correcto`);
        this.enrutador.navigate(['/login']);
      },
      error: () => {
        this.Errormsg = 'Error';
      }
    });
  }
}
