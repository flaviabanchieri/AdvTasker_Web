import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';
import { ProcessoUrl } from '../../../core/url/processo-url';
import { FASES_PROCESSO } from '../../../core/interfaces/faseProcesso';

@Component({
  selector: 'app-processo-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './processos-cadastro.component.html',
  styleUrls: ['./processos-cadastro.component.css']
})
export class ProcessoCadastroComponent implements OnInit {
  formProcesso!: FormGroup;
  fases = FASES_PROCESSO;
  classesProcesso = [
    { id: 1, nome: 'Cível' },
    { id: 2, nome: 'Criminal' },
    { id: 3, nome: 'Trabalhista' },
    { id: 4, nome: 'Família' },
    // ...ou buscar do backend
  ];

  constructor(private fb: FormBuilder, private router: Router, private toastrService: ToastrService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formProcesso = this.fb.group({
      NumeroProcesso: ['', Validators.required],
      vara: [''],
      comarca: [''],
      estado: [''],
      faseAtual: [null, Validators.required],
      classeId: [null],
      area: [null],
      valorCausa: [null],
      justicaGratuita: [false],
      segredoJustica: [false],
      tutelaAntecipada: [false],
      liminarConcedida: [false],
      juizResponsavel: [''],
      dataDistribuicao: [null],
      dataEntrada: [null],
      linkConsulta: [''],
      observacoes: ['']
    });
  }

  onSubmit(): void {
    if (this.formProcesso.valid) {
      const dto = {
        ...this.formProcesso.value,
        valorCausa: this.formProcesso.value.valorCausa
          ? parseFloat(this.formProcesso.value.valorCausa)
          : null
      };

      this.apiService.postItems(ProcessoUrl.Cadastrar, dto).subscribe({
        next: (response: any) => {
          this.toastrService.success(response.message);
          this.router.navigate([`/processo/${response.data}`]);
        },
        error: (err) => {
          console.log(err)
          if (err.status === 400 && err.error?.message) {
            this.toastrService.warning(err.error.message); // Mostra: "Já existe um proc com este documento."
          } else {
            this.toastrService.warning('Ocorreu um erro inesperado.');
          }
        }
      });
    }
  }


  cancelar() {
    this.formProcesso.reset();
    this.router.navigate(['/processos'])
  }
}
