import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { ClienteUrl } from '../../../core/url/cliente-url';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes-criar',
  templateUrl: './clientes-criar.component.html',
  styleUrls: ['./clientes-criar.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class ClientesCriarComponent implements OnInit {

  formCliente!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.formCliente = this.fb.group({
      tipoPessoa: [1, Validators.required],

      // Comuns
      documento: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.email],

      // Pessoa Física
      nome: [''],
      rg: [''],
      orgaoEmissor: [''],
      dataEmissaoRg: [''],
      nascimento: [''],
      estadoCivil: [''],
      profissao: [''],
      genero: [''],

      // Pessoa Jurídica
      razaoSocial: [''],
      nomeFantasia: [''],
      inscricaoEstadual: [''],
      inscricaoMunicipal: [''],
      responsavelLegal: [''],
      cpfResponsavel: [''],
    });

    // Ajusta validações dinamicamente ao mudar o tipo de pessoa
    this.formCliente.get('tipoPessoa')?.valueChanges.subscribe(tipo => {
      this.configurarValidacoes(tipo);
    });
  }

  configurarValidacoes(tipo: number): void {
    const controls = this.formCliente.controls;

    // Resetar todos os validators primeiro
    controls['nomeCompleto'].clearValidators();
    controls['razaoSocial'].clearValidators();

    // Campos obrigatórios conforme o tipo
    if (tipo === 1) {
      controls['nomeCompleto'].setValidators([Validators.required]);
    } else if (tipo === 2) {
      controls['razaoSocial'].setValidators([Validators.required]);
    }

    // Atualizar validações
    for (let control in controls) {
      controls[control].updateValueAndValidity();
    }
  }

  toggleForm(tipo: number) {
    this.formCliente.reset();
    this.formCliente.get('tipoPessoa')?.setValue(tipo)
  }

  onSubmit(): void {
    if (this.formCliente.valid) {
      const formData = this.formCliente.value;

      if (formData.nascimento) {
        formData.nascimento = new Date(formData.nascimento).toISOString(); // "2025-08-19T00:00:00.000Z"
      }

      this.apiService.postItems(ClienteUrl.Cadastrar, formData).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (err) => {
          this.toastrService.error(err)
        }
      });
    }

    // Aqui você pode chamar seu serviço para salvar:
    // this.apiService.salvarCliente(clienteData).subscribe(...)
  }
}