import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/Auth';

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string, password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
      tap(usuario => {
        localStorage.setItem('currentUser', JSON.stringify(usuario));
      })
    );
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
  }


  logout(): void {
    localStorage.removeItem('currentUser');
  }


  getCurrentUser(): Usuario | null {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      return null;
    }
    return JSON.parse(user) as Usuario;
  }

 
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}