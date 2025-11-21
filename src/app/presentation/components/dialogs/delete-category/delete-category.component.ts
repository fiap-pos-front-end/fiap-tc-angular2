import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '@fiap-pos-front-end/fiap-tc-shared';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-delete-category',
  imports: [ButtonModule, ToastModule],
  templateUrl: './delete-category.component.html',
  providers: [CategoryService],
})
export class DeleteCategoryComponent {
  private destroyRef = inject(DestroyRef);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);

  category: Category = this.config.data.category;
  remove() {
    this.removeCategory();
  }
  close() {
    this.ref.close();
  }
  private removeCategory() {
    this.categoryService
      .delete(this.category.id)
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
