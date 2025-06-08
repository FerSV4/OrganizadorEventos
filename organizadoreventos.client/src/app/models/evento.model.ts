export interface Evento {
    eventoId: number;
    titulo: string;
    descripcion: string;
    fecha: Date;
    lugar?: string;
    estado: boolean;
    creadorId: number;
  }