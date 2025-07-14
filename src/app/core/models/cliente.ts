export interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  processosAtivos: number;
  status: 'Ativo' | 'Inativo' | 'Pendente';
}