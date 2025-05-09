import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { ApiService } from '../services/generic.service';
import { Usuario } from '../models/usuario';
import { ToastrService } from 'ngx-toastr';

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
    private toastService: ToastrService
  ) { }

  login(email: string, senha: string): Observable<{ status: number; mensagem: string }> {
    const usuario = { id: 0, nome: '', email, senha };

    var loginRespose = this.apiService.postItemsSemToken('usuarios/login', usuario).pipe(
      map((response: any) => {
        const token = response.token;
        const temEscritorio = response.usuario.usuarioEscritorio.length > 0;
        if (token) {
          localStorage.setItem('token', token);
          if (!temEscritorio) {
            this.router.navigate(['/onboarding']);
          } else {
            this.router.navigate(['/home']);
          }

        }
        return { status: 200, mensagem: 'Login bem-sucedido' };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição:', error);

        if(error.status === 401) {
          this.toastService.error('', 'Email ou Senha inválidos', { timeOut: 2000 });
        }
        return of({ status: error.status, mensagem: error.error?.mensagem || 'Erro desconhecido' });
      })
    );
    return loginRespose;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
