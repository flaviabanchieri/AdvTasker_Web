export interface Prazo {
  id: string;
  titulo: string;
  descricao: string;
  dataFinal: Date;
  prioridade: 'alta' | 'media' | 'baixa';
  concluido: boolean;
}