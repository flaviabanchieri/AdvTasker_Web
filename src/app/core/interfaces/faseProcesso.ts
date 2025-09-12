export interface FaseProcesso {
  id: number;
  nome: string;
}

export const FASES_PROCESSO: FaseProcesso[] = [
  { id: 1, nome: 'Inicial' },
  { id: 2, nome: 'Instrução' },
  { id: 3, nome: 'Recursal' },
  { id: 4, nome: 'Execução' },
];