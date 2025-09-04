import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUiComponent } from "./shared/loading-overlay.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, RouterModule, BlockUiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'AdvTasker_Web';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

  }
  
}

