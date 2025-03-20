import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  nomeUsuario: string = 'Teste';
  emailUsuario: string = 'teste@gmail.com';
  avatarUrl: string = 'https://via.placeholder.com/40';

  constructor(private router: Router, private titleService: Title) { }

  get getRouteTitle(): string {
    var route = this.router.routerState.root;
    let title = '';
    while (route.firstChild) {
      route = route.firstChild;
      if (route.snapshot.data && route.snapshot.data['title']) {
        title = route.snapshot.data['title'];
      }
    }
    return title;
  }

}
