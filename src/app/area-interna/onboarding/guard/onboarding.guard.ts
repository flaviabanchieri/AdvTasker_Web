import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // ajuste o caminho conforme necessário
import { ApiService } from '../../../core/services/api.service';
import { EscritorioUrl } from '../../../core/url/escritorio-url';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.apiService.getItems<boolean>(EscritorioUrl.OnboardingFinalizado).pipe(
      map(finalizado => {
        if (finalizado) {
          return true;
        } else {
          return this.router.createUrlTree(['/onboarding']); // página para onde redirecionar
        }
      }),
      catchError(error => {
        console.error('Erro ao verificar onboarding:', error);
        return of(this.router.createUrlTree(['/onboarding']));
      })
    );
  }
}
