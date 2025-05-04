import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseListDTO } from '../../types/types';
import { properties } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseListService {

  private baseUrl: String =
      properties.baseUrl + properties.separator + properties.domainApi;

  constructor(private http: HttpClient) { }

  getTreRandomExpensesLists(): Observable<ExpenseListDTO []> {
    return this.http.get<ExpenseListDTO[]>(`${this.baseUrl}/getdemo`);
  }

}
