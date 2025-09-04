import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteDadosGerais } from '../../../../core/models/cliente/cliente';
import { ApiService } from '../../../../core/services/api.service';
import { ClienteUrl } from '../../../../core/url/cliente-url';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-cliente-dados-gerais',
  templateUrl: './cliente-dados-gerais.component.html',
  styleUrls: ['./cliente-dados-gerais.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class ClienteDadosGeraisComponent implements OnInit {

  @Input() clienteId!: string;
  pessoaFisicaForm!: FormGroup;
  pessoaJuridicaForm!: FormGroup;
  tipoPessoa: number = 1;
  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.construirFormularioPf();
    this.construirFormularioPj();
    this.obterCliente();
  }

  construirFormularioPf() {
    this.pessoaFisicaForm = this.fb.group({
      nomeCompleto: [''],
      cpfCnpj: [''],
      rg: [''],
      profissao: [''],
      nacionalidade: [''],
      estadoCivil: [''],
      telefone: [''],
      email: ['']
    })
  }

  construirFormularioPj() {
    this.pessoaJuridicaForm = this.fb.group({
      razaoSocial: [''],
      nomeFantasia: [''],
      cpfCnpj: [''],
      natureza: [''],
      responsavel: [''],
      documentoResponsavel: [''],
      rgResponsavel: [''],
      profissaoResponsavel: [''],
      nacionalidadeResponsavel: [''],
      estadoCivilResponsavel: [''],
      enderecoResponsavel: [''],
      cargoResponsavel: [''],
    })
  }

  obterCliente() {
    this.apiService.getItems<ClienteDadosGerais>(ClienteUrl.ObterCliente + this.clienteId)
      .subscribe((cliente: ClienteDadosGerais) => {
        this.tipoPessoa = cliente.tipoPessoa;
        console.log(cliente);
        var rg = (cliente.pessoaFisicaDto?.rg) ? cliente.pessoaFisicaDto?.rg + ' ' + cliente.pessoaFisicaDto?.emissaoRG : '-';
        if (cliente.pessoaFisicaDto) {
          this.pessoaFisicaForm.patchValue({
            nomeCompleto: cliente.nome,
            cpfCnpj: cliente.documento,
            telefone: cliente.telefone,
            email: cliente.email,
            rg: rg,
            profissao: cliente.pessoaFisicaDto.profissao,
            nacionalidade: cliente.pessoaFisicaDto.nacionalidade,
            estadoCivil: cliente.pessoaFisicaDto.estadoCivil
          });
        }

        if (cliente.pessoaJuridicaDto) {
          this.pessoaJuridicaForm.patchValue({
            razaoSocial: cliente.pessoaJuridicaDto.razaoSocial,
            nomeFantasia: cliente.pessoaJuridicaDto.nomeFantasia,
            cpfCnpj: cliente.documento,
            natureza: cliente.pessoaJuridicaDto.natureza,
            responsavel: cliente.pessoaJuridicaDto.responsavelLegal,
            documentoResponsavel: cliente.pessoaJuridicaDto.cpfResponsavel,
            rgResponsavel: cliente.pessoaJuridicaDto.rgResponsavel,
            profissaoResponsavel: cliente.pessoaJuridicaDto.profissaoResponsavel,
            estadoCivilResponsavel: cliente.pessoaJuridicaDto.estadoCivilResponsavel,
            enderecoResponsavel: cliente.pessoaJuridicaDto.enderecoResponsavel,
            cargoResponsavel: cliente.pessoaJuridicaDto.cargoResponsavel,
          });
        }

      });
  }

}
