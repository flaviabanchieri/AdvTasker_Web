import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, NgbModule, RouterModule]
})
export class SidebarComponent implements OnInit {

  @Output() toggle = new EventEmitter<boolean>();
  public parentId = ``;
  isCollapsed: boolean = false;
  dropdownsAbertos: string[] = new Array;
  constructor(public router: Router,) { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.parentId = ``;
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);

    if (this.isCollapsed) {
      if (this.dropdownsAbertos.length > 0) {
        this.dropdownsAbertos = [];
      }
      this.parentId = ''
    }
  }

  isChildActive(basePath: string): boolean {
    const currentRoute = this.router.url; // Obtém a rota atual

    switch (basePath) {
      case 'administrativo':
        return (currentRoute.endsWith('gestao-lead') ||
          currentRoute.endsWith('clientes-importar') ||
          currentRoute.endsWith('pessoa-importar') ||
          currentRoute.endsWith('veiculo-importar')
        );
      case 'configuracao':
        return (
          currentRoute.endsWith('empresa') ||
          currentRoute.endsWith('usuarios') ||
          currentRoute.includes('configuracoes')
        );
      case 'financeiro':
        return (currentRoute.endsWith('listagem-contas-pagar') ||
          currentRoute.endsWith('listagem-contas-receber') ||
          currentRoute.endsWith('recorrentes-parcelados')
        );
      case 'relatorio':
        return (currentRoute.endsWith('listagem-relatorios') ||
          currentRoute.endsWith('listagem-veiculos-relatorio') ||
          currentRoute.endsWith('listagem-relatorio-comissao')
        );
      default:
        // Para outros casos, verifica se a rota começa com a basePath
        return currentRoute.startsWith(basePath);
    }
  }

  clickedMenu(event: { currentTarget: any; }) {
    const target = event.currentTarget;
    const parentId = target.id;

    if (this.isCollapsed) {
      this.toggleSidebar();
    }

    if (parentId === this.parentId) {
      this.parentId = ``;
    } else {
      this.parentId = target.id;
    }

    if (this.dropdownsAbertos.includes(parentId)) {
      this.dropdownsAbertos = this.dropdownsAbertos.filter(id => id !== parentId); //
    } else {
      this.dropdownsAbertos.push(parentId);
    }
  }

  drop(parentId: string) {
    if (this.dropdownsAbertos.includes(parentId)) {
      return true;
    } else {
      return false;
    }
  }


}
