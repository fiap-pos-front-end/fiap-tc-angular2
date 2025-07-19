import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryDto } from '../models/category.dto';
import { Category, CategoryPayload } from '../models/category.model';
import { ApiResponse } from '../types/api-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);

  private readonly categoryBaseUrl = `${environment.apiUrl}/categories`;

  getAll(): Observable<Category[]> {
    return this.httpClient
      .get<ApiResponse<CategoryDto[]>>(`${this.categoryBaseUrl}`)
      .pipe(map((res) => res.map((dto) => this.mapDtoToModel(dto))));
  }

  create(category: CategoryPayload): Observable<Category> {
    return this.httpClient
      .post<ApiResponse<CategoryDto>>(`${this.categoryBaseUrl}`, category)
      .pipe(map((res) => this.mapDtoToModel(res)));
  }

  update(category: Category): Observable<Category> {
    return this.httpClient
      .put<ApiResponse<CategoryDto>>(
        `${this.categoryBaseUrl}/${category.id}`,
        category
      )
      .pipe(map((res) => this.mapDtoToModel(res)));
  }

  delete(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.categoryBaseUrl}/${id}`);
  }

  private mapDtoToModel(dto: CategoryDto): Category {
    return { id: dto.id, name: dto.name };
  }
}
