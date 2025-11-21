import { Observable } from 'rxjs';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(id: number): Observable<void> {
    if (!id) {
      throw new Error('ID da categoria é obrigatório!');
    }

    return this.categoryRepository.delete(id);
  }
}
