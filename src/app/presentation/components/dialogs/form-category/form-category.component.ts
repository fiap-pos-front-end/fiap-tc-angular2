import { Component, DestroyRef, inject, model, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CreateCategoryUseCase } from '../../../../domain/usecases/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from '../../../../domain/usecases/UpdateCategoryUseCase';

@Component({
  selector: 'app-form-category',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './form-category.component.html',
})
export class FormCategoryComponent implements OnInit {
  private ref = inject(DynamicDialogRef);
  private destroyRef = inject(DestroyRef);
  private config = inject(DynamicDialogConfig);
  private messageService = inject(MessageService);

  private createCategoryUseCase = inject(CreateCategoryUseCase);
  private updateCategoryUseCase = inject(UpdateCategoryUseCase);

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
    this.updateCategoryUseCase
      .execute(this.config.data.id, this.name())
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
}
