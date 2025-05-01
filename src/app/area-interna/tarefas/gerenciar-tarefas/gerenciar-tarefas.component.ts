import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Prazo } from '../../../core/models/prazo';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gerenciar-tarefas',
  templateUrl: './gerenciar-tarefas.component.html',
  styleUrls: ['./gerenciar-tarefas.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule,
    RouterModule,
  ],
})

export class GerenciarTarefasComponent implements OnInit {
  today = new Date();
  tarefas: Prazo[] = [
    {
      id: '1',
      titulo: 'Entrega do projeto',
      descricao: 'Finalizar desenvolvimento do módulo principal',
      dataFinal: new Date(2023, 11, 15),
      prioridade: 'alta',
      concluido: false
    }
  ];

totaltarefas: any =0;
tarefasFataisHoje: any = 16;
tarefasAtrasados = 3;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  tarefasHoje(): number {
    return this.tarefas.filter((p: Prazo) =>
      !p.concluido &&
      p.dataFinal.getDate() === this.today.getDate() &&
      p.dataFinal.getMonth() === this.today.getMonth() &&
      p.dataFinal.getFullYear() === this.today.getFullYear()
    ).length;
  }

  isAtrasado(tarefa: Prazo): boolean {
    return !tarefa.concluido && tarefa.dataFinal < this.today;
  }

  abrirDialogoNovotarefa(): void {

  }

  toggleConcluido(tarefa: Prazo): void {
    this.tarefas = this.tarefas.map(p =>
      p.id === tarefa.id ? { ...p, concluido: !p.concluido } : p
    );
  }

  editartarefa(tarefa: Prazo): void {
    console.log('Editar tarefa:', tarefa);
  }

  excluirtarefa(tarefa: Prazo): void {
    this.tarefas = this.tarefas.filter(p => p.id !== tarefa.id);
  }

  trackById(index: number, tarefa: Prazo): string {
    return tarefa.id;
  }
}

