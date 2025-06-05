import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Cliente } from '../../../core/models/cliente';
@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css'],
  imports: [CommonModule, MatTabsModule]
})
export class ClienteCadastroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 cliente: Cliente = this.mockCliente();

  private mockCliente(): Cliente {
    return {
      nome: 'João da Silva',
      documento: '123.456.789-00',
      email: 'joao@email.com',
      telefone: '(11) 91234-5678',
      tipoPessoa: 0,
      rg: 12345678,
      emissaoRG: 'SSP-SP',
      dataEmissaoRG: new Date('2010-05-01'),
      nascimento: new Date('1985-03-15'),
      estadoCivil: 'Solteiro',
      profissao: 'Advogado',
      razaoSocial: '',
      nomeFantasia: '',
      ativo: true,
      endereco: [
        {
          principal: true,
          logradouro: 'Rua das Flores',
          numero: '123',
          bairro: 'Centro',
          complemento: '',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01000-000',
        },
      ],
      parte: [
        {
          numeroProcesso: '0001234-56.2023.8.26.0000',
          descricao: 'Ação de Cobrança',
        },
      ],
      agendas: [
        { agenda: {
          dataInicial: '2025-06-15T14:30:00',
          descricao: 'Reunião com cliente sobre novo processo',
          id: '',
          titulo: '',
          tipo: '',
          escritorioId: 0,
          dataFinal: '',
          cor: '',
          usuario: []
        }
        },
      ],
    };
  }
}