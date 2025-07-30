import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr'; // Importe o ToastrService

interface SignUpForm {
  name: FormControl,
  email: FormControl,
  password:FormControl,
  passwordConfirm:FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [
    LoginService // Mantenha apenas o LoginService aqui
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService // Injete o ToastrService
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