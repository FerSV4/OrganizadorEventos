import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/usuario.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Flujo usado para mostrar el nombre de usuario en la vista.
  usuarioActual$: Observable<Usuario | null>;

  constructor(private servicioAuth: AuthService) {
    this.usuarioActual$ = this.servicioAuth.usuarioActual$;
  }

  cerrarSesion(): void {
    this.servicioAuth.logout();
  }
}
