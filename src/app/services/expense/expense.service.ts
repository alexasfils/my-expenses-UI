import { Injectable } from '@angular/core';
import { properties } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ExpenseDTO, PagedDataDTO } from '../../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl: String = `${properties.baseUrl}${properties.separator}${properties.domainApi}/expense`;

  constructor(private http: HttpClient) {}

  getAllExpensesbyListId(
    expenseListId: number,
    page: number = 0,
    size: number = 16
  ): Observable<PagedDataDTO<ExpenseDTO>> {
    return this.http.get<PagedDataDTO<ExpenseDTO>>(
      `${this.baseUrl}/all/${expenseListId}?page=${page}&size=${size}`
    );
  }

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
