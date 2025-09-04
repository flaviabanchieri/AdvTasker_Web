import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { ResultadoBusca } from '../../../core/models/resultado-busca';
import { ProcessoListagem } from '../../../core/models/processo/processo-listagem';
import { ProcessoUrl } from '../../../core/url/processo-url';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class ProcessosComponent implements OnInit {
  formFiltro!: FormGroup;
  processos: ProcessoListagem[] = [];
  mostrarAvancado = false;
  listaClasseProcesso: { id: number; nome: string }[] = [];

  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder) {

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
    this.obterProcessos();
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

  criarProcesso(){
    this.router.navigate([`/processos/criar`]);
  }
  obterProcessos() {
    const filtros = this.formFiltro.value;
    this.apiService.getFiltro<ResultadoBusca<ProcessoListagem>>(ProcessoUrl.ListarProcessos, filtros).subscribe((processos: ResultadoBusca<ProcessoListagem>) => {
      console.log('Processos filtrados:', processos);
      this.processos = processos.items;
    });
  }

  statusClass(status: number): string {
    switch (status) {
      case 1: return 'bg-green';
      case 2: return 'bg-gray';
      case 3: return 'bg-yellow';
      default: return '';
    }
  }

  irParaProcesso(processo: ProcessoListagem) {
    this.router.navigate(['processo', processo.id]);

  }

  limparFiltros(){
    this.formFiltro.reset();
    this.obterProcessos();
  }
}