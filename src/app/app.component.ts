import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-expenses-client';

  constructor(private authService: AuthService) {
    this.authService.initializeUserFromLocalStorage();
  }
}
