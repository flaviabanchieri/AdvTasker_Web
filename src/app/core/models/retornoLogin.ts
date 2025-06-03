
export interface UsuarioEscritorio {
  escritorioId: number;
  nome: string;
}

interface Usuario {
  email: string;
  usuarioEscritorio: UsuarioEscritorio[];
  primeiroLogin: boolean;
}

export class LoginResponse {
  usuario!: Usuario;
}
