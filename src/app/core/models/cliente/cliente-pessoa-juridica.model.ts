
export interface ClientePessoaJuridica {
  clienteId: string; // Guid convertido para string
  razaoSocial?: string;
  nomeFantasia?: string;
  natureza?: string;
  responsavelLegal?: string;
  cpfResponsavel?: string;
  rgResponsavel?: string;
  emissaoRgResponsavel?: string;
  estadoCivilResponsavel?: string;
  profissaoResponsavel?: string;
  enderecoResponsavel?: string;
  cargoResponsavel?: string;
}