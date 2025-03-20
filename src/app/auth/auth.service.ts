import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Lógica de autenticação (exemplo simples)
    if (username === 'user' && password === 'password') {
      this.isAuth = true;
      this.router.navigate(['/home']);
      return true;
    } else {
      this.isAuth = false;
      return false;
    }
  }

  logout(): void {
    this.isAuth = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }
}
