import { Injectable } from '@angular/core';
import { properties } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthDTO, UserDTO, UserRequestDTO } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: String =
    properties.baseUrl + properties.separator + properties.domainApi;

  constructor(private http: HttpClient) {}

  // Registrazione
  register(user: UserRequestDTO): Observable<UserRequestDTO> {
    return this.http.post<UserRequestDTO>(`${this.baseUrl}/register`, user);
  }

  // Login
  login(credentials: UserAuthDTO): Observable<UserAuthDTO> {
    return this.http.post<UserAuthDTO>(`${this.baseUrl}/login`, credentials);
  }

  // Salva il token in localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Ottieni il token dal localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Logout (rimuovi il token)
  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
