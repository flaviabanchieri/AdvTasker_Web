import { ClientePessoaFisica } from "./cliente-pessoa-fisica.model";
import { ClientePessoaJuridica } from "./cliente-pessoa-juridica.model";

export interface ClienteDadosGerais {
  id: string;
  nome: string;
  documento: string;
  tipoPessoa: number;
  email: string; 
  telefone: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  pessoaFisicaDto?: ClientePessoaFisica;
  pessoaJuridicaDto?: ClientePessoaJuridica;
}