import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Cliente } from '../../../core/models/cliente';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [
    CommonModule,       
    ReactiveFormsModule,
    RouterModule
  ],
})
export class ClientesComponent implements OnInit {
    buscaControl = new FormControl('', { nonNullable: true });
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];

  constructor(private router: Router){

  }
  ngOnInit(): void {
    // Simula dados mockados
    this.clientes = [
      {
        id: '1', nome: 'João Silva', cpfCnpj: '123.456.789-00',
        email: 'joao@email.com', telefone: '(11) 91234-5678',
        processosAtivos: 3, status: 'Ativo'
      },
      {
        id: '2', nome: 'Maria Souza', cpfCnpj: '987.654.321-00',
        email: 'maria@email.com', telefone: '(21) 99876-5432',
        processosAtivos: 0, status: 'Pendente'
      },
      {
        id: '3', nome: 'Carlos Lima', cpfCnpj: '111.222.333-44',
        email: 'carlos@email.com', telefone: '(31) 91234-0000',
        processosAtivos: 1, status: 'Inativo'
      },
      {
        id: '4', nome: 'Ana Paula', cpfCnpj: '555.666.777-88',
        email: 'ana@email.com', telefone: '(41) 98888-1234',
        processosAtivos: 5, status: 'Ativo'
      }
    ];

    this.clientesFiltrados = [...this.clientes];

    this.buscaControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(valor => this.filtrarClientes(valor));
  }

  filtrarClientes(valor: string | null): void {
    const filtro = (valor || '').toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(filtro) ||
      cliente.cpfCnpj.toLowerCase().includes(filtro) ||
      cliente.email.toLowerCase().includes(filtro)
    );
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Ativo': return 'bg-green';
      case 'Inativo': return 'bg-gray';
      case 'Pendente': return 'bg-yellow';
      default: return '';
    }
  }

  irParCliente(cliente: Cliente){
    this.router.navigate(['cliente', cliente.id]);

  }
}