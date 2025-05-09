import { Routes } from '@angular/router';
import { LoginComponent } from './area-externa/login/login.component';
import { HomeComponent } from './area-interna/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AgendaComponent } from './area-interna/agenda/agenda.component';
import { CriarEditarAgendaComponent } from './area-interna/agenda/criar-editar-agenda/criar-editar-agenda.component';
import { ErrorPageComponent } from './area-externa/error-page/error-page.component';
import { PrazosComponent } from './area-interna/prazos/ver-prazos/prazos.component';
import { IntimacoesComponent } from './area-interna/prazos/intimacoes/intimacoes.component';
import { GerenciarPrazosComponent } from './area-interna/prazos/gerenciar-prazos/gerenciar-prazos.component';
import { MinhasTarefasComponent } from './area-interna/tarefas/minhas-tarefas/minhas-tarefas.component';
import { GerenciarTarefasComponent } from './area-interna/tarefas/gerenciar-tarefas/gerenciar-tarefas.component';
import { ClientesComponent } from './area-interna/clientes/clientes/clientes.component';
import { ClientesCriarComponent } from './area-interna/clientes/clientes-criar/clientes-criar.component';
import { ClientesEditarComponent } from './area-interna/clientes/clientes-editar/clientes-editar.component';
import { ProcessosComponent } from './area-interna/processos/processos/processos.component';
import { ProcessosCriarComponent } from './area-interna/processos/processos-criar/processos-criar.component';
import { ProcessosEditarComponent } from './area-interna/processos/processos-editar/processos-editar.component';
import { RelatorioDesempenhoComponent } from './area-interna/relatorios/relatorio-desempenho/relatorio-desempenho.component';
import { ExplorarComponent } from './area-interna/explorar/explorar/explorar.component';
import { NotificacaoComponent } from './area-interna/notificações/notificacao/notificacao.component';
import { CadastroUsuarioComponent } from './area-externa/cadastro-usuario/cadastro-usuario.component';
import { CadastroEscritorioComponent } from './area-interna/cadastro-escritorio/cadastro-escritorio.component';
import { WelcomeComponent } from './area-interna/welcome/welcome.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, data: { title: 'Painel' } },
      { path: 'agenda', component: AgendaComponent, data: { title: 'Agenda' } },
      { path: 'agenda/editar/:id', component: CriarEditarAgendaComponent, data: { title: 'Agenda > Criar' } },
      { path: 'prazos', component: PrazosComponent, data: { title: 'Prazos' } },
      { path: 'prazos/gerenciar', component: GerenciarPrazosComponent, data: { title: 'Prazos > Gerenciar' } },
      { path: 'intimacao', component: IntimacoesComponent, data: { title: 'Initmações' } },
      { path: 'tarefas', component: MinhasTarefasComponent, data: { title: 'Minhas tarefas' } },
      { path: 'tarefas/gerenciar', component: GerenciarTarefasComponent, data: { title: 'Tarefas > Gerenciar' } },
      { path: 'clientes', component: ClientesComponent, data: { title: 'Clientes' } },
      { path: 'clientes/criar', component: ClientesCriarComponent, data: { title: 'Clientes > Criar' } },
      { path: 'clientes/editar', component: ClientesEditarComponent, data: { title: 'Clientes > Editar' } },
      { path: 'processos', component: ProcessosComponent, data: { title: 'Processos' } },
      { path: 'processos/criar', component: ProcessosCriarComponent, data: { title: 'Processos > Criar' } },
      { path: 'processos/editar', component: ProcessosEditarComponent, data: { title: 'Processos > Editar' } },
      { path: 'relatorios', component: RelatorioDesempenhoComponent, data: { title: 'Relatório de Desempenho' } },
      { path: 'notificacoes', component: NotificacaoComponent, data: { title: 'Notificações' } },
      { path: 'explore', component: ExplorarComponent, data: { title: 'Explore' } },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroUsuarioComponent
  },
  {
    path: 'onboarding',
    component: CadastroEscritorioComponent,
    canActivate: [AuthGuard],
    data: { title: 'Bem-Vindo' }
  },
  {
    path: 'Bem-vindo',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { title: 'Bem-Vindo' }
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: '/404' }
];
