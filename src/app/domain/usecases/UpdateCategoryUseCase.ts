import { CategoryRepository } from '../repositories/CategoryRepository';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(categoryId: number, name: string) {
    if (!categoryId) {
      throw new Error('ID da categoria é obrigatório!');
    }

    return this.categoryRepository.update(categoryId, name);
  }
}
