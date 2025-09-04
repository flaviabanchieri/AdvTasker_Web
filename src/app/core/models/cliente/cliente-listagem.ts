export interface Cliente {
  id: string;
  nome: string;
  documento: string;
  email: string;
  telefone: string;
  numeroProcessos: number;
  status: 'Ativo' | 'Inativo' | 'Pendente';
}