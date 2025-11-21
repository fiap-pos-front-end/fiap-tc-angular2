import { Component, DestroyRef, inject, model, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CreateCategoryUseCase } from '../../../../domain/usecases/CreateCategoryUseCase';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-form-category',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './form-category.component.html',
  providers: [CategoryService],
})
export class FormCategoryComponent implements OnInit {
  private ref = inject(DynamicDialogRef);
  private destroyRef = inject(DestroyRef);
  private config = inject(DynamicDialogConfig);
  private messageService = inject(MessageService);
  private categoryService = inject(CategoryService);

  private createCategoryUseCase = inject(CreateCategoryUseCase);

  name = model('');
  isAdding = true;

  ngOnInit(): void {
    this.isAdding = this.config.header?.includes('Adicionar') ?? true;
  }

  save() {
    if (this.isAdding) this.createCategory();
    else this.updateCategory();
  }

  close() {
    this.ref.close();
  }

  private createCategory() {
    this.createCategoryUseCase
      .execute(this.name())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.ref.close(res);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.error.message,
            life: 3000,
          });
        },
      });
  }

  private updateCategory() {
    this.categoryService
      .update({ id: this.config.data.id, name: this.name() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.ref.close(res);
      });
  }
}
