import { AgendaCliente } from "./agenda/agendaCliente";
import { Endereco } from "./endereco";
import { Parte } from "./processo/parte";

export interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  processosAtivos: number;
  status: 'Ativo' | 'Inativo' | 'Pendente';
}