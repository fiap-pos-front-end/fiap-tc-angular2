import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CategoryDTO,
  CategoryResponsePayload,
} from '@fiap-pos-front-end/fiap-tc-shared';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../types/api-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);

  private readonly categoryBaseUrl = `${environment.apiUrl}/categories`;

  getAll(): Observable<CategoryResponsePayload[]> {
    return this.httpClient.get<ApiResponse<CategoryResponsePayload[]>>(
      `${this.categoryBaseUrl}`
    );
  }

  create(
    category: Omit<CategoryDTO, 'id'>
  ): Observable<CategoryResponsePayload> {
    return this.httpClient.post<ApiResponse<CategoryResponsePayload>>(
      `${this.categoryBaseUrl}`,
      category
    );
  }

  update(category: CategoryDTO): Observable<CategoryResponsePayload> {
    return this.httpClient.put<ApiResponse<CategoryResponsePayload>>(
      `${this.categoryBaseUrl}/${category.id}`,
      category
    );
  }

  delete(id: string): Observable<CategoryResponsePayload> {
    return this.httpClient.delete<CategoryResponsePayload>(
      `${this.categoryBaseUrl}/${id}`
    );
  }
}
