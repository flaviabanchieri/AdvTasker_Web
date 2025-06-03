import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { ApiService } from '../services/generic.service';
import { Usuario } from '../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SelecionarEscritorioDialogComponent } from '../../area-externa/SelecionarEscritorioDialog/SelecionarEscritorioDialog.component';
import { LoginResponse } from '../models/retornoLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = false;
  private readonly apiUrl = 'https://localhost:44360/api/usuarios';


  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) { }

  login(email: string, senha: string): Observable<{ status: number; mensagem: string }> {
    const usuario = { id: 0, nome: '', email, senha };

    return (this.apiService.postItemsSemToken('usuarios/login', usuario) as Observable<LoginResponse>).pipe(
      switchMap((response: LoginResponse) => {
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
              console.log(escritorioId);

              return this.apiService.postItemsSemToken('usuarios/gerar-token', {
                email: response.usuario.email,
                escritorioId
              }).pipe(
                map((resp: any) => {
                  localStorage.setItem('token', resp.token);
                  localStorage.setItem('primeiroLogin', String(response.usuario.primeiroLogin));
                  this.router.navigate(['/home']);
                  return { status: 200, mensagem: 'Login realizado com sucesso' };
                })
              );
            })
          );
        } else {

          const escritorioId = response.usuario.usuarioEscritorio[0].escritorioId;
          console.log(response)
          return this.apiService.postItemsSemToken('usuarios/gerar-token', {
            email: response.usuario.email,
            escritorioId
          }).pipe(
            map((resp: any) => {
              localStorage.setItem('token', resp.token);
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


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('primeiroLogin');
    this.isAuth = false;
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = this.getPayload(token);
    if (!payload || !payload.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000); // tempo atual em segundos
    return payload.exp > currentTime;
  }

  private getPayload(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (e) {
      return null;
    }
  }
}
