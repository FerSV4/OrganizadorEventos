import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit { 
  loginData = { correo: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
 
    const usuarioLogueado = this.authService.getUsuarioLogueado();
    
    if (usuarioLogueado) {
      this.router.navigate(['/mis-eventos-creados']); 
    }
  }

  onLogin(): void {
    this.errorMessage = null;
    this.authService.login(this.loginData).subscribe({
      next: (usuario) => {
        console.log('Login exitoso:', usuario);
        this.router.navigate(['/mis-eventos-creados']);
      },
      error: () => {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
}
