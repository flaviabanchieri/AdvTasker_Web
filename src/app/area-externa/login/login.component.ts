import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  senhaVazia = false;
  usuarioVazio = false;
  senhaIncorreta: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Inicializa o formulário no construtor
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    event.preventDefault();  // Impede o recarregamento da página

    if (this.loginForm.valid) {
      const username = this.loginForm.get('user')?.value;
      const password = this.loginForm.get('password')?.value;
      if (this.authService.login(username, password).subscribe()) {
      } else {
        this.senhaIncorreta = true; 
      }
    } else {
      this.senhaIncorreta = true; 
    }
  }

}
