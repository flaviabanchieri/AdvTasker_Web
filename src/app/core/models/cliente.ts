import { AgendaCliente } from "./agenda/agendaCliente";
import { Endereco } from "./endereco";
import { Parte } from "./processo/parte";

export interface Cliente {
  nome: string;
  documento: string;
  email: string;
  telefone: string;
  tipoPessoa: number;
  rg?: number;
  emissaoRG?: string;
  dataEmissaoRG?: Date;
  nascimento?: Date;
  razaoSocial?: string;
  estadoCivil?: string;
  profissao?: string;
  nomeFantasia?: string;
  ativo: boolean;
  endereco: Endereco[];
  parte: Parte[];
  agendas: AgendaCliente[];
  dataAtualizacao?: Date;
}