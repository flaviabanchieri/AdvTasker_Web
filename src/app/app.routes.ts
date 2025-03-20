import { Routes } from '@angular/router';
import { LoginComponent } from './area-externa/login/login.component';
import { HomeComponent } from './area-interna/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AgendaComponent } from './area-interna/agenda/agenda.component';
import { CriarEditarAgendaComponent } from './area-interna/agenda/criar-editar-agenda/criar-editar-agenda.component';
import { ErrorPageComponent } from './area-externa/error-page/error-page.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, data: { title: 'Painel' }},
      { path: 'agenda', component: AgendaComponent, data: { title: 'Agenda' }},
      { path: 'agenda/editar/:id', component: CriarEditarAgendaComponent, data: { title: 'Agenda' } },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: '/404' }
];
