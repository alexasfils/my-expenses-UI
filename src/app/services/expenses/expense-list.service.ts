import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseListDTO } from '../../types/types';
import { properties } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseListService {
  private baseUrl: String = `${properties.baseUrl}${properties.separator}${properties.domainApi}/expenses`;

  constructor(private http: HttpClient) {}

  getAllUserExpensesLists(): Observable<ExpenseListDTO[]> {
    return this.http.get<ExpenseListDTO[]>(`${this.baseUrl}/all`);
  }

  getExpenseById(expenseListId: number): Observable<ExpenseListDTO> {
    return this.http.get<ExpenseListDTO>(`${this.baseUrl}/${expenseListId}`);
  }

  createExpenseList(expenseList: ExpenseListDTO): Observable<ExpenseListDTO> {
    return this.http.post<ExpenseListDTO>(`${this.baseUrl}`, expenseList);
  }

  deleteExpenseListById(expenseListId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${expenseListId}`);
  }
}
