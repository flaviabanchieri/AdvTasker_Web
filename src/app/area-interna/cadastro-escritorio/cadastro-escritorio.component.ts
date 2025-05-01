import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/generic.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { TipoEscritorio } from '../../core/enums/tipoEscritorio.enum';

@Component({
  selector: 'app-cadastro-escritorio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule
  ],
  templateUrl: './cadastro-escritorio.component.html',
  styleUrls: ['./cadastro-escritorio.component.scss']
})
export class CadastroEscritorioComponent implements OnInit {
  form!: FormGroup;

  tipos = [
    { label: 'Individual', value: TipoEscritorio.Individual },
    { label: 'Sociedade', value: TipoEscritorio.Sociedade }
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      tipo: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.api.postItems('escritorios/cadastro', this.form.value).subscribe({
      next: () => {
        this.toast.success('Escritório cadastrado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toast.error('Erro ao cadastrar escritório.');
        console.error(err);
      }
    });
  }
}
