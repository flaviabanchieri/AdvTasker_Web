import { CriarPrazosComponent } from './../criar-prazos/criar-prazos.component';
import { RouterModule } from '@angular/router';

import { Prazo } from '../../../core/models/prazo';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gerenciar-prazos',
  templateUrl: './gerenciar-prazos.component.html',
  styleUrls: ['./gerenciar-prazos.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule,
    RouterModule,
  ]
})
export class GerenciarPrazosComponent implements OnInit {
  today = new Date();
  prazos: Prazo[] = [
    {
      id: '1',
      titulo: 'Entrega do projeto',
      descricao: 'Finalizar desenvolvimento do módulo principal',
      dataFinal: new Date(2023, 11, 15),
      prioridade: 'alta',
      concluido: false
    }
  ];

totalPrazos: any =0;
prazosFataisHoje: any = 16;
prazosAtrasados = 3;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  prazosHoje(): number {
    return this.prazos.filter((p: Prazo) =>
      !p.concluido &&
      p.dataFinal.getDate() === this.today.getDate() &&
      p.dataFinal.getMonth() === this.today.getMonth() &&
      p.dataFinal.getFullYear() === this.today.getFullYear()
    ).length;
  }

  isAtrasado(prazo: Prazo): boolean {
    return !prazo.concluido && prazo.dataFinal < this.today;
  }

  abrirDialogoNovoPrazo(): void {
    this.dialog.open(CriarPrazosComponent, {
      width: '600px'
    });
  }

  toggleConcluido(prazo: Prazo): void {
    this.prazos = this.prazos.map(p =>
      p.id === prazo.id ? { ...p, concluido: !p.concluido } : p
    );
  }

  editarPrazo(prazo: Prazo): void {
    console.log('Editar prazo:', prazo);
  }

  excluirPrazo(prazo: Prazo): void {
    this.prazos = this.prazos.filter(p => p.id !== prazo.id);
  }

  trackById(index: number, prazo: Prazo): string {
    return prazo.id;
  }
}
