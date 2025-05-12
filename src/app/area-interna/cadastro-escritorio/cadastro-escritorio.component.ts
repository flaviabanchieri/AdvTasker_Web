import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/generic.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { TipoEscritorio } from '../../core/enums/tipoEscritorio.enum';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../../core/interfaces/Estado';
import { EstadosCidadesService } from '../../core/services/estados-cidades.service';

@Component({
  selector: 'app-cadastro-escritorio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './cadastro-escritorio.component.html',
  styleUrls: ['./cadastro-escritorio.component.scss']
})
export class CadastroEscritorioComponent implements OnInit {
  escritorioForm!: FormGroup;
  estados: Estado[] = [];
  siglas: string[] = []; // só as siglas
  cidades: string[] = []; // cidades da sigla selecionada
  siglaSelecionada: string = ''; // para usar no ngModel
  diasSemana: string[] = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];
  diasSelecionados: string[] = [];

  constructor(private apiService: ApiService, 
    private router: Router, 
    private fb: FormBuilder, 
    private http: HttpClient, 
    private estadoService: EstadosCidadesService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.estadoService.obterEstadosECidades().subscribe((estados: Estado[]) => {
      this.estados = estados;
      this.siglas = estados.map(e => e.sigla); // só as siglas
    });
  }

  initForms(): void {
    this.escritorioForm = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
    });

  }

  onSiglaChange(): void {
    const estado = this.estados.find(e => e.sigla === this.siglaSelecionada);
    this.cidades = estado ? estado.cidades : [];
  }

  finalizar(): void {
    const payload = {
      ...this.escritorioForm.value,
    };

    this.apiService.postItems('escritorio/cadastro', payload).subscribe(
      (response: any) => {
        console.log('Escritório cadastrado com sucesso:', response);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Erro ao cadastrar escritório:', error);
        this.toastr.error('Erro ao cadastrar escritório. Tente novamente.');
      });
  }

  toggleDia(dia: string): void {
    const index = this.diasSelecionados.indexOf(dia);
    if (index > -1) {
      this.diasSelecionados.splice(index, 1);
    } else {
      this.diasSelecionados.push(dia);
    }
  }

}