import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeComponent } from '../welcome/welcome.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.welcomeMessage()
  }

  redirect(path: string) {
    this.router.navigate([path])
  }

  welcomeMessage(): void {
    this.apiService.getItems<{ primeiroLogin: boolean }>('usuarios/ObterPrimeiroLogin')
      .subscribe((res) => {
        console.log(res);
        if (res.primeiroLogin) {
          this.abrirWelcomeDialog();
        }
      }, (error) => {
        console.error('Erro ao verificar primeiro login:', error);
      });
  }


  abrirWelcomeDialog(): void {
    const dialogRef = this.dialog.open(WelcomeComponent, {
      width: "auto",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe(result => {
      this.primeiroLoginConcluido();
    });
  }

  primeiroLoginConcluido() {
    this.apiService.postItems('usuarios/concluirPrimeiroLogin', null).pipe(
    ).subscribe({})
  }


}
