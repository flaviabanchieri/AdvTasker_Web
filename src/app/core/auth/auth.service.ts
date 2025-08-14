import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Usuario } from '../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SelecionarEscritorioDialogComponent } from '../../area-externa/SelecionarEscritorioDialog/SelecionarEscritorioDialog.component';
import { LoginResponse } from '../models/retornoLogin';
import { EscritorioUrl } from '../url/escritorio-url';
import { ScrollResponder } from '@fullcalendar/core/internal';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = false;
  private readonly apiUrl = 'https://localhost:44360/api/auth';


  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) { }

  login(email: string, senha: string): Observable<{ status: number; mensagem: string }> {
    const usuario = { id: 0, nome: '', email, senha };

    return (this.apiService.postItemsSemToken('auth/login', usuario) as Observable<LoginResponse>).pipe(
      switchMap((response: LoginResponse) => {
        console.log(response);
        if (response.usuario.usuarioEscritorio.length > 1) {
          const dialogRef = this.dialog.open(SelecionarEscritorioDialogComponent, {
            data: {
              escritorios: response.usuario.usuarioEscritorio,
              usuario: response.usuario
            }
          });

          return dialogRef.afterClosed().pipe(
            switchMap((escritorioId: string) => {
              if (!escritorioId) {
                return of({ status: 400, mensagem: 'Seleção de escritório cancelada' });
              }

              return this.apiService.postItems('auth/gerar-token', {
                email: response.usuario.email,
                escritorioId
              }).pipe(
                map((resp: any) => {
                  localStorage.setItem('primeiroLogin', String(response.usuario.primeiroLogin));
                  this.router.navigate(['/home']);
                  return { status: 200, mensagem: 'Login realizado com sucesso' };
                })
              );
            })
          );
        } else {

          const escritorioId = response.usuario.usuarioEscritorio[0].escritorioId;

          return this.apiService.postItems('auth/gerar-token', {
            email: response.usuario.email,
            escritorioId
          }).pipe(
            map((resp: any) => {
              localStorage.setItem('primeiroLogin', String(response.usuario.primeiroLogin));
              if (response.usuario.primeiroLogin == true) {
                this.router.navigate(['/onboarding']);
              } else {
                this.router.navigate(['/home']);
              }
              return { status: 200, mensagem: 'Login realizado com sucesso' };
            })
          );
        }
      }),
      catchError(err => {
        return of({ status: 500, mensagem: 'Erro ao realizar login' });
      })
    );
  }


  refreshToken() {
    return this.apiService.postItems(`auth/refresh`, null);
  }

  logout() {
    this.apiService.postItems('auth/logout', null).subscribe({
      next: () => {
        localStorage.removeItem('primeiroLogin');
        this.isAuth = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('primeiroLogin');
        this.isAuth = false;
        this.router.navigate(['/login']);
      }
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.apiService.getItems('auth/me').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

}
