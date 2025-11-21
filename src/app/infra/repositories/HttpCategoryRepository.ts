import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';

export class HttpCategoryRepository implements CategoryRepository {
  private readonly httpClient = inject(HttpClient);

  private readonly categoryBaseUrl = `${environment.apiUrl}/categories`;

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.categoryBaseUrl}`);
  }

  create(name: string): Observable<Category> {
    return this.httpClient.post<Category>(this.categoryBaseUrl, { name });
  }

  update(id: number, name: string): Observable<Category> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.categoryBaseUrl}/${id}`);
  }
}
