export interface Evento {
  eventoId: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  lugar?: string;
  estado: boolean;
  creadorId: number;

  fechaFin?: Date;
  capacidad?: number;
  precio?: number;
  creadorNombreUsuario?: string;
}