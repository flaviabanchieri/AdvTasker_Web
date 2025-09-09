import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processo-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './processos-cadastro.component.html',
  styleUrls: ['./processos-cadastro.component.css']
})
export class ProcessoCadastroComponent implements OnInit {
  formProcesso!: FormGroup;
  fases = ['Inicial', 'Instrução', 'Recursal', 'Execução'];
classesProcesso = [
  { id: 1, nome: 'Cível' },
  { id: 2, nome: 'Criminal' },
  { id: 3, nome: 'Trabalhista' },
  { id: 4, nome: 'Família' },
  // ...ou buscar do backend
];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formProcesso = this.fb.group({
      numeroProcesso: ['', Validators.required],
      vara: [''],
      comarca: [''],
      estado: [''],
      faseAtual: ['', Validators.required],
      classeId: [null],
      area: [null],
      valorCausa: [''],
      justicaGratuita: [false],
      segredoJustica: [false],
      tutelaAntecipada: [false],
      liminarConcedida: [false],
      juizResponsavel: [''],
      dataDistribuicao: [null],
      dataEntrada: [null],
      linkConsulta:[''],
      observacoes: ['']
    });
  }

  onSubmit() {
    if (this.formProcesso.valid) {
      console.log('Processo salvo:', this.formProcesso.value);
      // aqui você chama o service da API
    }
  }

  cancelar() {
    this.formProcesso.reset();
    this.router.navigate(['/processos'])
  }
}
