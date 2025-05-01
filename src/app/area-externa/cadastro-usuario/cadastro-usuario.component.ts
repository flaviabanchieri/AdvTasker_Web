
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { Usuario } from '../../core/models/usuario';
import { ApiService } from '../../core/services/generic.service';
import { Cargo } from '../../core/enums/cargos.enum';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class CadastroUsuarioComponent implements OnInit {
  loginForm: FormGroup;
  senhaVazia = false;
  usuarioVazio = false;
  senhaIncorreta: boolean = false;
  cargos = [
    { label: 'Advogado', value: Cargo.Advogado },
    { label: 'Estagiário', value: Cargo.Estagiario },
    { label: 'Financeiro', value: Cargo.Financeiro },
    { label: 'Secretário', value: Cargo.Secretario },
    { label: 'Administrador', value: Cargo.Administrador }
  ];


  constructor(private fb: FormBuilder, private toastService: ToastrService, private authService: AuthService, private router: Router, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      cargo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const nome = this.loginForm.get('nome')?.value;
      const username = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('senha')?.value;

      var usuario: Usuario = new Usuario();
      usuario.email = username;
      usuario.senha = password;
      usuario.nome = nome;
      usuario.cargo = this.loginForm.get('cargo')?.value;

      this.apiService.postItemsSemToken('usuarios/cadastro', usuario).pipe(
        map((response: any) => {
          console.log(response);
          if (response.status === 201) {
            this.authService.login(username, password);
          }
        })
      ).subscribe({
        next: () => { },

        error: (err) => {
          if (err.status === 409) {
            this.toastService.success('Já existe um usuário com esse e-mail ou CPF!');
          } else {
            this.toastService.error('Erro ao cadastrar usuário. Tente novamente.');
            console.error(err);
          }
        }
      })

    }
  }

}
