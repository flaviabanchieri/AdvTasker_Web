import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  nomeUsuario: string = 'Teste';
  emailUsuario: string = 'teste@gmail.com';
  avatarUrl: string = 'https://photo.com/1';

  constructor(private router: Router, private location: Location) { }

 ngOnInit(): void {
   this.avatarUrl = this.nomeUsuario.charAt(0);
 }

 getAvatarLetter(): string {
  return this.nomeUsuario ? this.nomeUsuario.charAt(0).toUpperCase() : '?';
}

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

   get canGoBack(): boolean {
    let route = this.router.routerState.root;
    let voltar = false;
    while (route.firstChild) {
      route = route.firstChild;
      if (route.snapshot.data && route.snapshot.data['voltar'] === true) {
        voltar = true;
      }
    }
    return voltar;
  }

  goBack() {
    this.location.back();
  }

}
