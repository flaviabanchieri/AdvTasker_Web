export interface ClientePessoaFisica {
  clienteId: string; // Guid convertido para string
  rg?: number;
  emissaoRG?: string;
  dataEmissaoRG?: Date;
  nascimento?: Date;
  estadoCivil?: string;
  profissao?: string;
  genero?: number;
  nacionalidade?: string;
}