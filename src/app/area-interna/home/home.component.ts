import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/generic.service';
import { MatDialog } from '@angular/material/dialog';

import { BlockUI, BlockUIModule, NgBlockUI, BlockUIService } from 'ng-block-ui';
import { WelcomeComponent } from '../welcome/welcome.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [BlockUIModule ],
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router, 
    private apiService: ApiService, 
    public dialog: MatDialog,
    private blockUIService: BlockUIService 
  ) { }

  ngOnInit() {
    this.welcomeMessage()
  }

  redirect(path: string) {
    this.router.navigate([path])
  }

  welcomeMessage() {
    this.apiService.getItems('usuarios/ObterPrimeiroLogin').pipe(
    ).subscribe({
      next: (res) => {
        if (res) {
         this.dialog.open(WelcomeComponent, {
            width: "auto",
            height: "auto",
          });
        }
      }
    })
  }

}
