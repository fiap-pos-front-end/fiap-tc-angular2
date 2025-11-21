import { Observable } from 'rxjs';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(): Observable<Category[]> {
    return this.categoryRepository.getAll();
  }
}
