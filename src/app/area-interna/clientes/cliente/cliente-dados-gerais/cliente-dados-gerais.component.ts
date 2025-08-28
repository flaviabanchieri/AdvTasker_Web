import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CasdastroCliente } from '../../../../core/models/cliente';
import { ApiService } from '../../../../core/services/api.service';
import { ClienteUrl } from '../../../../core/url/cliente-url';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-dados-gerais',
  templateUrl: './cliente-dados-gerais.component.html',
  styleUrls: ['./cliente-dados-gerais.component.css'],
  imports: [FormsModule,
    ReactiveFormsModule, CommonModule]
})
export class ClienteDadosGeraisComponent implements OnInit {

  @Input() clienteId!: string;
  form!: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.construirFormularioPf();
    this.obterCliente();
  }

  construirFormularioPf() {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      rg: [''],
      profissao: [''],
      nacionalidade: [''],
      estadoCivil: [''],
      telefone: [''],
      email: ['']
    })
  }

  obterCliente() {
    this.apiService.getItems<CasdastroCliente>(ClienteUrl.ObterCliente + this.clienteId)
      .subscribe((cliente: CasdastroCliente) => {
        console.log(cliente)
        this.form.patchValue({
          nomeCompleto: cliente.nome,
          cpfCnpj: cliente.documento,
          telefone: cliente.telefone,
          email: cliente.email
        });
      });
  }

}
