import { Usuario } from "../usuario";

export class Agenda {
  id!: string;
  titulo!: string;
  descricao!: string;
  tipo!: string;
  escritorioId!: number;
  dataInicial!: string;
  dataFinal!: string;
  cor!: string;
  usuario!: Usuario[];
}


