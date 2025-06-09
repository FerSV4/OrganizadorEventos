import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms'; 
    import { AuthService } from '../../services/auth.service';
    import { Router } from '@angular/router';
    
    @Component({
      selector: 'app-login',
      standalone: true,
      imports: [CommonModule, FormsModule],
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css']
    })
    export class LoginComponent {
      loginData = { correo: '', password: '' };
      errorMessage: string | null = null;
    
      constructor(private authService: AuthService, private router: Router) {}
    
      onLogin(): void {
        this.authService.login(this.loginData).subscribe({
          next: (usuario) => {
            console.log('Login exitoso!', usuario);
            this.errorMessage = null;
            this.router.navigate(['/']); 
          },
          error: (err) => {
            console.error('Error en el login:', err);
            this.errorMessage = 'Correo o contraseña incorrectos.';
          }
        });
      }
    }