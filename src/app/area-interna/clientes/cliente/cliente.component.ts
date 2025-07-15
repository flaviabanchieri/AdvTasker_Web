import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ClienteContatosComponent } from "./cliente-contatos/cliente-contatos.component";
import { ClientesEditarComponent } from "../clientes-editar/clientes-editar.component";
import { ClienteEnderecoComponent } from "./cliente-endereco/cliente-endereco.component";
import { ClienteProcessosComponent } from "./cliente-processos/cliente-processos.component";
import { ClienteAnotacoesComponent } from "./cliente-anotacoes/cliente-anotacoes.component";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    CommonModule,
    ClienteContatosComponent,
    ClienteEnderecoComponent,
    ClienteProcessosComponent,
    ClienteAnotacoesComponent
]
})
export class ClienteComponent implements OnInit {
  form!: FormGroup;
  abas: string[] = ['Contatos', 'Endereços', 'Processos', 'Anotações'];
  abaAtiva: string = 'Contatos';
  clienteId: number = 1;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      dadosPessoais: this.fb.group({
        nomeCompleto: ['', Validators.required],
        cpfCnpj: ['', Validators.required],
        rg: [''],
        profissao: [''],
        nacionalidade: [''],
        estadoCivil: [''],
        telefone: [''],
        email: ['']
      }),
      anotacoes: [''],
      processos: this.fb.array([]),
      agendas: this.fb.array([]),
      financeiro: this.fb.group({
        saldo: [0],
        pendencias: [[]],
        historico: [[]]
      })
    });
  }


  get processos(): FormArray {
    return this.form.get('processos') as FormArray;
  }

  get agendas(): FormArray {
    return this.form.get('agendas') as FormArray;
  }

  salvar(): void {
    console.log(this.form.value);
  }
}
