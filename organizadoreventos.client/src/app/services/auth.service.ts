// Ruta: src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Usuario } from '../models/usuario.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/Auth';
//En este servicio se optó por utilizar el localStorage para almacenar los datos del usuario logueado.
  private readonly CLAVE_USUARIO_LOGUEADO = 'usuarioLogueado'; 
//Tambien por buenas practicas, se utiliza un patron de "observer" para notificar a los componentes que el usuario ha cambiado.
  private usuarioLogueadoSubject = new BehaviorSubject<Usuario | null>(this.getUsuarioLogueado());

  public usuarioActual$ = this.usuarioLogueadoSubject.asObservable();

  constructor(private http: HttpClient, private enrutador: Router) { }

  login(credenciales: { correo: string, password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credenciales).pipe(

      tap(usuario => {
        localStorage.setItem(this.CLAVE_USUARIO_LOGUEADO, JSON.stringify(usuario));
        this.usuarioLogueadoSubject.next(usuario);
      })
    );
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
  }

  logout(): void {

    localStorage.removeItem(this.CLAVE_USUARIO_LOGUEADO);

    this.usuarioLogueadoSubject.next(null);

    this.enrutador.navigate(['/eventos']);
    alert('Has cerrado sesión exitosamente.');
  }

  getUsuarioLogueado(): Usuario | null {
    const usuarioJson = localStorage.getItem(this.CLAVE_USUARIO_LOGUEADO);
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  }
}
