import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/Auth';

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string, password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials);
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
  }
}