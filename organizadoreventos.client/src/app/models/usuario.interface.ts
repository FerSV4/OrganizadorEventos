export interface Usuario {
    usuarioId: number;
    nombreUsuario: string;
    nombreCompleto: string;
    fechaNacimiento: Date;
    direccion?: string;
    correo: string;
  }