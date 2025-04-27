import { Injectable } from '@angular/core';
import { environment, properties } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${properties.domainApi}/auth`; // Cambia in base al tuo URL API

  private baseUrl: String = properties.baseUrl + properties.separator + properties.domainApi;

  constructor(private http: HttpClient) {}

  // Registrazione
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
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
