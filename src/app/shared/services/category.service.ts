import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CategoryDTO,
  CategoryResponsePayload,
} from '@fiap-pos-front-end/fiap-tc-shared';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../types/api-response';

// TODO: também tem que vir do shared, mas como ia mexer muita coisa, deixei pra depois
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);

  private readonly categoryBaseUrl = `${environment.apiUrl}/categories`;

  getAll(): Observable<Category[]> {
    return this.httpClient
      .get<ApiResponse<CategoryResponsePayload[]>>(`${this.categoryBaseUrl}`)
      .pipe(map((res) => res.map((dto) => this.mapDtoToModel(dto))));
  }

  create(category: Omit<CategoryDTO, 'id'>): Observable<Category> {
    return this.httpClient
      .post<ApiResponse<CategoryResponsePayload>>(
        `${this.categoryBaseUrl}`,
        category
      )
      .pipe(map((res) => this.mapDtoToModel(res)));
  }

  update(category: Category): Observable<Category> {
    return this.httpClient
      .put<ApiResponse<CategoryResponsePayload>>(
        `${this.categoryBaseUrl}/${category.id}`,
        category
      )
      .pipe(map((res) => this.mapDtoToModel(res)));
  }

  delete(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.categoryBaseUrl}/${id}`);
  }

  private mapDtoToModel(dto: CategoryResponsePayload): Category {
    return { id: dto.id, name: dto.name };
  }
}
