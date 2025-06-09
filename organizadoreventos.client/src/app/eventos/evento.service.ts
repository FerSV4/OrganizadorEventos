import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Evento } from '../models/evento.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = '/api/eventos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getEventos(): Observable<Evento[]> {
    const usuarioActual = this.authService.getCurrentUser();

    if (!usuarioActual) {
      return of([]);
    }

    const creadorId = usuarioActual.usuarioId;
    return this.http.get<Evento[]>(`${this.apiUrl}/por-creador/${creadorId}`);
  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  createEvento(evento: Evento): Observable<Evento> {
    const usuarioActual = this.authService.getCurrentUser();

    if (!usuarioActual) {
      alert('Error: Debes iniciar sesión para poder crear un evento.');
      return new Observable(observer => observer.error('Usuario no autenticado'));
    }

    evento.creadorId = usuarioActual.usuarioId;
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  updateEvento(id: number, evento: Evento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, evento);
  }

  deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}