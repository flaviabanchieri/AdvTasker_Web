import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [SidebarComponent, RouterOutlet, HeaderComponent]
})
export class MainLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.isSidebarCollapsed = this.sidebarService.toggleSidebar();
  }

}
