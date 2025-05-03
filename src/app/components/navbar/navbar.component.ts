import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthDTO } from '../../types/types';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  showLoginModal = false;
  showRegisterModal = false;
  user!: UserAuthDTO;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.userDTOSubject$.subscribe((user) => {
      this.user = user!;
    });
  }

  handleLogin() {
    this.showLoginModal = true;
    // this.router.navigate(['/login']);
  }

  onCloseLoginModal() {
    this.showLoginModal = false;
  }

handleRegister() {
    this.showRegisterModal = true;
  }

  onCloseRegisterModal() {
    this.showRegisterModal = false;
  }
}
