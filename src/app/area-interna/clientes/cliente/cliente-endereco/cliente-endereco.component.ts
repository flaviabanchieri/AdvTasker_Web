import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Endereco } from '../../../../core/models/endereco';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-endereco',
  templateUrl: './cliente-endereco.component.html',
  styleUrls: ['./cliente-endereco.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
})
export class ClienteEnderecoComponent implements OnInit {
  enderecos: Endereco[] = [];
  enderecoForm!: FormGroup;
  showForm = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Inicializa o form
    this.enderecoForm = this.fb.group({
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', [Validators.required, Validators.maxLength(2)]],
      cep: ['', Validators.required],
    });

    // Mock de endereços (pode remover depois)
    this.enderecos = [
      {
        logradouro: 'Av. Paulista',
        numero: '1000',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        complemento: '',
        principal: true,
        cep: '01310-000',
      },
      {
        logradouro: 'Rua das Flores',
        numero: '200',
        bairro: 'Centro',
        cidade: 'Curitiba',
        estado: 'PR',
        complemento: '',
        principal: false,
        cep: '80000-000',
      }
    ];
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.enderecoForm.reset();
    }
  }

  salvarEndereco(): void {
    if (this.enderecoForm.valid) {
      this.enderecos.push(this.enderecoForm.value);
      this.toggleForm(); // Fecha o form após salvar
    } else {
      this.enderecoForm.markAllAsTouched();
    }
  }
}