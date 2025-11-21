import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@fiap-pos-front-end/fiap-tc-shared';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../types/api-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);

  private readonly categoryBaseUrl = `${environment.apiUrl}/categories`;

  getAll(): Observable<Category[]> {
    return this.httpClient.get<ApiResponse<Category[]>>(
      `${this.categoryBaseUrl}`
    );
  }

  update(category: Omit<Category, 'userId'>): Observable<Category> {
    return this.httpClient.put<ApiResponse<Category>>(
      `${this.categoryBaseUrl}/${category.id}`,
      category
    );
  }
}
