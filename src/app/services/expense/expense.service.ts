import { Injectable } from '@angular/core';
import { properties } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExpenseDTO } from '../../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl: String = `${properties.baseUrl}${properties.separator}${properties.domainApi}/expense`;

  constructor(private http: HttpClient) {}

  createExpense(expense: ExpenseDTO): Observable<ExpenseDTO> {
    return this.http.post<ExpenseDTO>(`${this.baseUrl}`, expense);
  }

  updateUserExpense(expense: ExpenseDTO): Observable<ExpenseDTO> {
    return this.http.put<ExpenseDTO>(`${this.baseUrl}/update`, expense);
  }

  deleteExpenseById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  deleteAllExpenses(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/deleteall/${id}`);
  }
}
