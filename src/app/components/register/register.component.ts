import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      currency: ['', [Validators.required]],
    });
  }

  closeModal() {
    this.close.emit();
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('response Register', response);

        // this.router.navigate(['/login']); // Dopo la registrazione, vai alla pagina di login
        this.closeModal();
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please check the form data.';
      }
    );
  }
}
