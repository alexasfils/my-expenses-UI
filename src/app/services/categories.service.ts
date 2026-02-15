import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { properties } from '../../environments/environment';
import { CategoryDTO } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl: String = `${properties.baseUrl}${properties.separator}${properties.domainApi}/category`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${this.baseUrl}/all`);
  }

  getCategoryById(categoryId: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`${this.baseUrl}/${categoryId}`);
  }
}
