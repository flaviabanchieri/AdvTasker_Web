import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-Welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [MatIcon]
})
export class WelcomeComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<WelcomeComponent>,) { }

  ngOnInit() {
  }

  comecar(){
    this.dialogRef.close()
  }
}
