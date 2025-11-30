import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '@fiap-pos-front-end/fiap-tc-shared';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DeleteCategoryUseCase } from '../../../../domain/usecases/DeleteCategoryUseCase';

@Component({
  selector: 'app-delete-category',
  imports: [ButtonModule, ToastModule],
  templateUrl: './delete-category.component.html',
})
export class DeleteCategoryComponent {
  private ref = inject(DynamicDialogRef);
  private destroyRef = inject(DestroyRef);
  private config = inject(DynamicDialogConfig);
  private messageService = inject(MessageService);

  private deleteCategoryUseCase = inject(DeleteCategoryUseCase);

  category: Category = this.config.data.category;

  remove() {
    this.removeCategory();
  }

  close() {
    this.ref.close();
  }

  private removeCategory() {
    this.deleteCategoryUseCase
      .execute(this.category.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.ref.close(this.config.data.category);
        },
        error: (res) => {
          if (res.error.error === 'FK_ERROR')
            this.messageService.add({
              severity: 'warn',
              summary: 'Atenção',
              detail: res.error.message,
              life: 3000,
            });
        },
      });
  }
}
