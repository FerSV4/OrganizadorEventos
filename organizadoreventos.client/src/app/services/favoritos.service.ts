import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = '/api/usuarios';

  constructor(private http: HttpClient) { }

  obtenerFavoritos(usuarioId: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/${usuarioId}/favoritos`);
  }

  agregarFavorito(usuarioId: number, eventoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${usuarioId}/favoritos/${eventoId}`, {});
  }

  quitarFavorito(usuarioId: number, eventoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${usuarioId}/favoritos/${eventoId}`);
  }
}
