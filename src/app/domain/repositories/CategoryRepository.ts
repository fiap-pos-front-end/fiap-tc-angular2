import { Observable } from 'rxjs';
import { Category } from '../entities/Category';

export interface CategoryRepository {
  getAll(): Observable<Category[]>;
  create(name: string): Observable<Category>;
  update(id: number, name: string): Observable<Category>;
  delete(id: number): Observable<void>;
}
