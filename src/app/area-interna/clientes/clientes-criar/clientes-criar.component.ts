
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { ClienteUrl } from '../../../core/url/cliente-url';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes-criar',
  templateUrl: './clientes-criar.component.html',
  styleUrls: ['./clientes-criar.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
})
export class ClientesCriarComponent implements OnInit {

  formCliente!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.formCliente = this.fb.group({
      tipoPessoa: [1, Validators.required],
      documento: ['', Validators.required],
      telefone: [''],
      email: ['', [Validators.email]],
      nome: [''],


      pessoaFisica: this.fb.group({
        rg: [null],
        emissaoRG: [''],
        dataEmissaoRg: [null],
        nascimento: [null],
        estadoCivil: [''],
        profissao: [''],
        genero: [null],
        nacionalidade: [''],
      }),

      pessoaJuridica: this.fb.group({
        razaoSocial: [''],
        nomeFantasia: [''],
        natureza: [''],
        responsavelLegal: [''],
        cpfResponsavel: [''],
        estadoCivilResponsavel: [''],
        profissaoResponsavel: [''],
        rgResponsavel: [''],
        dataEmissaoRgResponsavel: [null],
        enderecoResponsavel: [''],
        cargoResponsavel: ['']
      })
    });

    // Ajusta validações dinamicamente ao mudar o tipo de pessoa
    this.formCliente.get('tipoPessoa')?.valueChanges.subscribe(tipo => {
      this.configurarValidacoes(tipo);
    });
  }

  configurarValidacoes(tipo: number): void {
    const pfGroup = this.formCliente.get('pessoaFisica');
    const pjGroup = this.formCliente.get('pessoaJuridica');

    if (tipo === 1) { // Pessoa Física
      pfGroup?.get('nome')?.setValidators([Validators.required]);
      pjGroup?.get('razaoSocial')?.clearValidators();
    } else { // Pessoa Jurídica
      pfGroup?.get('nome')?.clearValidators();
      pjGroup?.get('razaoSocial')?.setValidators([Validators.required]);
    }

    pfGroup?.updateValueAndValidity();
    pjGroup?.updateValueAndValidity();
  }

  toggleForm(tipo: number) {
    this.formCliente.reset();
    this.formCliente.get('tipoPessoa')?.setValue(tipo)
  }

  onSubmit(): void {
    if (this.formCliente.valid) {
      const formData = this.formCliente.value;

      if (formData.tipoPessoa == 2) {
        formData.nome = formData.pessoaJuridica.nomeFantasia;
      }

      if (formData.nascimento) {
        formData.nascimento = new Date(formData.nascimento).toISOString(); // "2025-08-19T00:00:00.000Z"
      }

      if (formData.dataEmissaoRg) {
        formData.dataEmissaoRg = new Date(formData.dataEmissaoRg).toISOString();
      }

      this.apiService.postItems(ClienteUrl.Cadastrar, formData).subscribe({
        next: (response: any) => {
          this.toastrService.success(response.message);
          this.router.navigate([`/cliente/${response.data}`]);
        },
        error: (err) => {
          console.log(err)
          if (err.status === 400 && err.error?.message) {
            this.toastrService.warning(err.error.message); // Mostra: "Já existe um cliente com este documento."
          } else {
            this.toastrService.warning('Ocorreu um erro inesperado.');
          }
        }
      });
    }
  }

  cancelar(){
    this.router.navigate(['/clientes'])
  }
}