import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../services/user/user.service';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/Models/interfaces/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/Models/interfaces/user/SignupUserRequest';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router : Router
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);

            this.loginForm.reset();
            this.router.navigate(['/dashbord'])
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response?.name}`,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer o login !`,
            life: 2000,
          });
          console.log(err);
        },
      });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuario criado com sucesso ${response?.name}`,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao Criar usuário !`,
              life: 2000,
            });
            console.log(err);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
