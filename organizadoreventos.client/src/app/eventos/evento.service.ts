import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = '/api/eventos';
  private userApiUrl = '/api/usuarios';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  createEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  updateEvento(id: number, evento: Evento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, evento);
  }

  deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEventosPorUsuario(usuarioId: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.userApiUrl}/${usuarioId}/inscripciones`);
  }

  getEventosCreadosPorUsuario(usuarioId: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.userApiUrl}/${usuarioId}/eventosCreados`);
  }
}