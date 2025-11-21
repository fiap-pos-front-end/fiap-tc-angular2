import { Observable } from 'rxjs';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CreateCategoryUseCase {
  constructor(private categoriesRepo: CategoryRepository) {}

  execute(name: string): Observable<Category> {
    const category = Category.create(name);
    return this.categoriesRepo.create(category.name);
  }
}
