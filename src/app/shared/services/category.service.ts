import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category, CategoryPayload } from '../models/category.model';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../types/api-response';
import { CategoryDto } from '../models/category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  protected urlApi = 'http://localhost:3000/category';
  private httpClient = inject(HttpClient);

  getAll(): Observable<Category[]> {
    return this.httpClient
      .get<ApiResponse<CategoryDto[]>>(`${this.urlApi}`)
      .pipe(map((res) => res?.result.map((dto) => this.mapDtoToModel(dto))));
  }
  create(category: CategoryPayload): Observable<Category> {
    return this.httpClient
      .post<ApiResponse<CategoryDto>>(`${this.urlApi}`, category)
      .pipe(
        map((res) => {
          return this.mapDtoToModel(res?.result);
        })
      );
  }
  update(category: Category): Observable<Category> {
    return this.httpClient
      .put<ApiResponse<CategoryDto>>(`${this.urlApi}/${category.id}`, category)
      .pipe(map((res) => this.mapDtoToModel(res?.result)));
  }
  delete(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.urlApi}/${id}`);
  }
  private mapDtoToModel(dto: CategoryDto): Category {
    const { _id, ...rest } = dto;
    return { id: _id, ...rest };
  }
}
