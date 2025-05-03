import { Injectable } from '@angular/core';
import { properties } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UserAuthDTO, UserDTO, UserRequestDTO } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Declare properties to hold user information
  private userDTO?: UserAuthDTO;

  // Declare BehaviorSubjects to emit the latest user information
  public userDTOBehaviorSubject = new BehaviorSubject<UserAuthDTO | undefined>(
    undefined
  );
  public userDTOSubject$ = this.userDTOBehaviorSubject.asObservable();

  private baseUrl: String =
    properties.baseUrl + properties.separator + properties.domainApi;

  constructor(private http: HttpClient) {}

  // Register
  register(user: UserRequestDTO): Observable<UserRequestDTO> {
    return this.http.post<UserRequestDTO>(`${this.baseUrl}/register`, user);
  }

  // Login
  login(credentials: UserAuthDTO): Observable<UserAuthDTO> {
    return this.http
      .post<UserAuthDTO>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((user) => {
          if (user.token) {
            this.saveToken(user.token);
          }
          this.setUser(user);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  //save user inside behaviorSubject
  setUser(user: UserAuthDTO): void {
    this.userDTO = user;
    this.userDTOBehaviorSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  initializeUserFromLocalStorage(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: UserAuthDTO = JSON.parse(userJson);
      this.userDTO = user;
      this.userDTOBehaviorSubject.next(user);
    }
  }

  getCurrentUser(): UserAuthDTO | undefined {
    return this.userDTO;
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.userDTO = undefined;
    this.userDTOBehaviorSubject.next(undefined);
  }
}
