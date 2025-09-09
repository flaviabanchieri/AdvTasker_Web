import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { ClienteUrl } from '../../../core/url/cliente-url';
import { ResultadoBusca } from '../../../core/models/resultado-busca';
import { Cliente } from '../../../core/models/cliente/cliente-listagem';
import { BlockUiService } from '../../../core/services/block-ui.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class ClientesComponent implements OnInit {
  private blockUi = inject(BlockUiService);
  formFiltro!: FormGroup;
  clientes: Cliente[] = [];
  mostrarAvancado = false;
  listaClasseProcesso: { id: number; nome: string }[] = [];

  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private toastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.listaClasseProcesso = [
      { id: 1, nome: 'Divórcio Consensual' },
      { id: 2, nome: 'Divórcio Litigioso' },
      { id: 3, nome: 'Inventário e Partilha' },
      { id: 4, nome: 'Reconhecimento de União Estável' },
      { id: 5, nome: 'Guarda e Regulamentação de Visitas' },
      { id: 6, nome: 'Pensão Alimentícia' },
      { id: 7, nome: 'Ação de Cobrança' },
      { id: 8, nome: 'Indenização por Danos Morais' },
      { id: 9, nome: 'Indenização por Danos Materiais' },
      { id: 10, nome: 'Execução de Título Extrajudicial' },
      { id: 11, nome: 'Ação de Obrigação de Fazer' },
      { id: 12, nome: 'Reclamatória Trabalhista' },
      { id: 13, nome: 'Reconhecimento de Vínculo Empregatício' },
      { id: 14, nome: 'Verbas Rescisórias' },
      { id: 15, nome: 'Ação contra Plano de Saúde' },
      { id: 16, nome: 'Ação contra Instituição Financeira' },
      { id: 17, nome: 'Defeito de Produto ou Serviço' },
      { id: 18, nome: 'Aposentadoria por Invalidez' },
      { id: 19, nome: 'Auxílio-Doença' },
      { id: 20, nome: 'Revisão de Aposentadoria' },
      { id: 21, nome: 'Defesa em Inquérito Policial' },
      { id: 22, nome: 'Defesa em Ação Penal' },
      { id: 23, nome: 'Despejo por Falta de Pagamento' },
      { id: 24, nome: 'Reintegração de Posse' },
      { id: 25, nome: 'Ação Monitória' },
      { id: 26, nome: 'Mandado de Segurança' }
    ];

    this.construirFormulario();
    this.obterClientes();
  }

  construirFormulario() {
    this.formFiltro = this.fb.group({
      nome: [null],
      documento: [null],
      profissao: [null],
      classeProcessoId: [null],
      estado: [null],
      cidade: [null],
      pageNumber: [1],
      pageSize: [20]
    });
  }

  criarCliente(){
    this.router.navigate([`/clientes/criar`]);
  }
  obterClientes() {
  const filtros = this.formFiltro.value;
  this.blockUi.show();
  
  this.apiService.getFiltro<ResultadoBusca<Cliente>>(ClienteUrl.ListarClientes, filtros)
    .subscribe({
      next: (clientes: ResultadoBusca<Cliente>) => {
        this.blockUi.hide();
        this.clientes = clientes.items;
      },
      error: (err) => {
        this.blockUi.hide();
        this.toastrService.error('Erro ao obter clientes');
        console.error('Erro ao obter clientes:', err);
      }
    });
}

  statusClass(status: string): string {
    switch (status) {
      case 'Ativo': return 'bg-green';
      case 'Inativo': return 'bg-gray';
      case 'Pendente': return 'bg-yellow';
      default: return '';
    }
  }

  irParCliente(cliente: Cliente) {
    this.router.navigate(['cliente', cliente.id]);

  }

  limparFiltros(){
    this.formFiltro.reset();
    this.obterClientes();
  }
}