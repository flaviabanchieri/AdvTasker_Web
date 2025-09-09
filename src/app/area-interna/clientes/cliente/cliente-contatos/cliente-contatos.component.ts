import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contato } from '../../../../core/models/cliente/contato';

@Component({
  selector: 'app-cliente-contatos',
  templateUrl: './cliente-contatos.component.html',
  styleUrls: ['./cliente-contatos.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ClienteContatosComponent implements OnInit {

  contatos: Contato[] = [];
  contatoForm!: FormGroup;
  showForm = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contatoForm = this.fb.group({
      contato: ['', Validators.required],
      tipoContato: ['', [Validators.required, Validators.email]],
      observacao: [''],
      princial: [false]
    });

    // Mock de contatos (pode remover depois)
    this.contatos = [
      {
        tipoContato: 'WhatsApp',
        contato: '(67) 9 92488744',
        observacao: 'Responsável financeiro',
        principal: true
      },
      {
        tipoContato: 'Email',
        contato: 'maria@email.com',
        principal: false
      }
    ];
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.contatoForm.reset();
    }
  }

  salvarContato(): void {
    if (this.contatoForm.valid) {
      this.contatos.push(this.contatoForm.value);
      this.toggleForm();
    } else {
      this.contatoForm.markAllAsTouched();
    }
  }
}