import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { properties } from '../../../environments/environment';
import { ExpenseListDTO } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private baseUrl: string = `${properties.baseUrl}${properties.separator}${properties.domainApi}/demo`;

  constructor(private http: HttpClient) {}

  createExpenseList(dto: ExpenseListDTO): Observable<ExpenseListDTO> {
    return this.http.post<ExpenseListDTO>(`${this.baseUrl}`, dto);
  }

  getExpenseLists(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteExpenseList(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  addExpense(listId: number, expense: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${listId}/expenses`, expense);
  }

  getExpenses(listId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${listId}/expenses`);
  }

  reset(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reset`, {});
  }
}
