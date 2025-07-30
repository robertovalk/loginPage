import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common'; // ✅ Importado para uso de *ngIf
import { LoginService } from '../../service/login.service';
import { DefaultLoginLayoutComponent } from '../../default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

interface SignUpForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule, // ✅ Adicionado para suportar *ngIf e outras diretivas básicas
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] // verifique se o nome do arquivo está correto
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.loginService.login(email, password).subscribe({
        next: () => this.toastr.success("Login feito com sucesso!"),
        error: () => this.toastr.error("Erro inesperado, tente novamente!")
      });
    }
  }

  navigate() {
    this.router.navigate(["login"]);
  }
}
