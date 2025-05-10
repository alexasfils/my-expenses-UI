import { Injectable } from '@angular/core';
import { properties } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExpenseDTO } from '../../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
    private baseUrl: String = `${properties.baseUrl}${properties.separator}${properties.domainApi}/expense`;
  

  constructor(private http: HttpClient) { }

    createExpense(expense: ExpenseDTO): Observable<ExpenseDTO> {
      return this.http.post<ExpenseDTO>(`${this.baseUrl}`, expense);
  }
  
}
