import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../../shared/services/category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form-category',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss',
})
export class FormCategoryComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private categoryService = inject(CategoryService);
  name = model('');
  isAdding = true;
  ngOnInit(): void {
    this.isAdding = this.config.header?.includes('Adicionar') ?? true;
  }
  save() {
    if (this.isAdding) this.createCategory();
    else this.updateCategory();

    this.ref.close(true);
  }
  close() {
    this.ref.close();
  }

  private createCategory() {
    this.categoryService
      .create({ name: this.name() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.ref.close(true);
      });
  }
  private updateCategory() {
    this.categoryService
      .update({ id: this.config.data.id, name: this.name() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.ref.close(true);
      });
  }
}
