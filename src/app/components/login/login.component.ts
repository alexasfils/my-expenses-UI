import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('La response di LOGIN', response);
        this.router.navigate(['/home']); // Vai alla pagina di home
        this.closeModal();
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          'Login failed. Please check your credentials.';
      },
    });
  }
}
