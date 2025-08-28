
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-SelecionarEscritorioDialog',
  templateUrl: './SelecionarEscritorioDialog.component.html',
  styleUrls: ['./SelecionarEscritorioDialog.component.css'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    FormsModule
],
})
export class SelecionarEscritorioDialogComponent implements OnInit {
  escritorioSelecionadoId: string | undefined;
  escritorios!: any[];

  constructor(
    public dialogRef: MatDialogRef<SelecionarEscritorioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { escritorios: any[], usuario: any }
  ) {}

  ngOnInit() {
    console.log(this.data)
    this.escritorios = this.data.escritorios
  }

  selecionar(escritorioId: string){
    this.escritorioSelecionadoId = escritorioId
  }

    confirmar() {
      console.log(this.escritorioSelecionadoId);
    this.dialogRef.close(this.escritorioSelecionadoId);
  }

}
