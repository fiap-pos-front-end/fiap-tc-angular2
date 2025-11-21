import { Provider } from '@angular/core';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { CreateCategoryUseCase } from '../../domain/usecases/CreateCategoryUseCase';
import { DeleteCategoryUseCase } from '../../domain/usecases/DeleteCategoryUseCase';
import { GetAllCategoriesUseCase } from '../../domain/usecases/GetAllCategoriesUseCase';
import { UpdateCategoryUseCase } from '../../domain/usecases/UpdateCategoryUseCase';
import { HttpCategoryRepository } from '../../infra/repositories/HttpCategoryRepository';

/**
 * Uma nota interessante aqui é que eu usei como dependência o HttpCategoryRepository diretamente.
 *  Tendo em vista o tamanho desse MFE, isso é totalmente aceitável. No entanto, para um caso maior,
 *  podemos olhar o MFE de transactions (fiap-tc-angular) para ver que eu uso como dependência o
 *  token do Repositório. Isso é mais robusto porque se eu tivesse que trocar só o Repositório,
 *  eu trocaria apenas o provider do token, e não de todos os Casos de Uso (como aconteceria aqui).
 */
export const CATEGORIES_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetAllCategoriesUseCase,
    useFactory: (categoryRepository: CategoryRepository) =>
      new GetAllCategoriesUseCase(categoryRepository),
    deps: [HttpCategoryRepository],
  },
  {
    provide: CreateCategoryUseCase,
    useFactory: (categoryRepository: CategoryRepository) =>
      new CreateCategoryUseCase(categoryRepository),
    deps: [HttpCategoryRepository],
  },
  {
    provide: UpdateCategoryUseCase,
    useFactory: (categoryRepository: CategoryRepository) =>
      new UpdateCategoryUseCase(categoryRepository),
    deps: [HttpCategoryRepository],
  },
  {
    provide: DeleteCategoryUseCase,
    useFactory: (categoryRepository: CategoryRepository) =>
      new DeleteCategoryUseCase(categoryRepository),
    deps: [HttpCategoryRepository],
  },
];
