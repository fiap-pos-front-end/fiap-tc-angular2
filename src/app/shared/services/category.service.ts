import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category, CategoryPayload } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  protected urlApi = 'http://localhost:3000/category';
  private httpClient = inject(HttpClient);

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.urlApi}`);
  }
  create(category: CategoryPayload): Observable<Category> {
    return this.httpClient.post<Category>(`${this.urlApi}`, category);
  }
  update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.urlApi}/${category.id}`,
      category
    );
  }
  delete(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.urlApi}/${id}`);
  }
}
