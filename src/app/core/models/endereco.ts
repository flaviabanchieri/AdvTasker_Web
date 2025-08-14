export class Endereco {
    logradouro: string | undefined;
    numero!: string;
    complemento!: string;
    bairro!: string;
    cep!: string;
    cidade!: string;
    estado!: string;
    principal!: boolean
}