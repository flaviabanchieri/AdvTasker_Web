import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

import { ClienteContatosComponent } from "./cliente-contatos/cliente-contatos.component";
import { ClientesEditarComponent } from "../clientes-editar/clientes-editar.component";
import { ClienteEnderecoComponent } from "./cliente-endereco/cliente-endereco.component";
import { ClienteProcessosComponent } from "./cliente-processos/cliente-processos.component";
import { ClienteAnotacoesComponent } from "./cliente-anotacoes/cliente-anotacoes.component";
import { ClienteAgendaComponent } from "./cliente-agenda/cliente-agenda.component";
import { ApiService } from '../../../core/services/api.service';
import { ClienteUrl } from '../../../core/url/cliente-url';
import { CasdastroCliente, Cliente } from '../../../core/models/cliente';
import { ActivatedRoute } from '@angular/router';
import { ClienteFinanceiroComponent } from "./cliente-financeiro/cliente-financeiro.component";
import { ClienteDadosGeraisComponent } from "./cliente-dados-gerais/cliente-dados-gerais.component";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    ClienteContatosComponent,
    ClienteEnderecoComponent,
    ClienteProcessosComponent,
    ClienteAnotacoesComponent,
    ClienteAgendaComponent,
    ClienteFinanceiroComponent,
    ClienteDadosGeraisComponent
]
})
export class ClienteComponent implements OnInit {
  abas: string[] = ['Dados Gerais', 'Processos', 'Endereços', 'Contatos', 'Agenda', 'Financeiro', 'Anotações'];
  abaAtiva: string = 'Dados Gerais';
  clienteId!: string;
  nome!: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.clienteId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.obterCliente();
  }


  obterCliente() {
    this.apiService.getItems<CasdastroCliente>(ClienteUrl.ObterCliente + this.clienteId)
      .subscribe((cliente: CasdastroCliente) => {
        console.log(cliente)
        this.nome = cliente.nome
      });
  }

}
