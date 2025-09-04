import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BlockUiService } from '../../core/services/block-ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  private blockUi = inject(BlockUiService);
  loginForm: FormGroup;
  senhaVazia = false;
  usuarioVazio = false;
  senhaIncorreta: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Inicializa o formulário no construtor
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const username = this.loginForm.get('user')?.value;
    const password = this.loginForm.get('password')?.value;

    this.blockUi.show();
    this.authService.login(username, password).subscribe({
      next: (response: any) => {
        this.blockUi.hide();
      },
      error: (err: any) => {
        console.log('Erro recebido:', err);
        this.blockUi.hide();
        if (err.status === 401) {
          this.senhaIncorreta = true;
          console.log('401 detectado - senhaIncorreta ');
        } else {
          console.log('Erro:', err.status);
        }
      }

    });
  }

}

