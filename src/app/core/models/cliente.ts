export interface Cliente {
  id: string;
  nome: string;
  documento: string;
  email: string;
  telefone: string;
  numeroProcessos: number;
  status: 'Ativo' | 'Inativo' | 'Pendente';
}

export interface CasdastroCliente {
  id: string;
  nome: string;
  documento: string;
  email: string; 
  telefone: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
}