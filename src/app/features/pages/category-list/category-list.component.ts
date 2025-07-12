import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormCategoryComponent } from '../../components/dialogs/form-category/form-category.component';
import { Category } from '../../../shared/models/category.model';
import { DeleteCategoryComponent } from '../../components/dialogs/delete-category/delete-category.component';
import { CategoryService } from '../../../shared/services/category.service';
import { PRIMENG_MODULES } from './primeng-modules';
import { Table } from 'primeng/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-category-list',

  imports: [CommonModule, ...PRIMENG_MODULES],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  providers: [CategoryService, DialogService, MessageService],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt!: Table;
  private destroyRef = inject(DestroyRef);
  private dialogService = inject(DialogService);
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);
  private ref: DynamicDialogRef;
  categories: Category[] = [];
  searchValue: string;
  loading = false;

  ngOnInit(): void {
    this.fillTable();
  }
  newCategory() {
    this.createDialog(FormCategoryComponent, 'Adicionar Categoria');
  }
  updateCategory(category: Category) {
    const data = { id: category.id };
    const inputValues = { name: category.name };
    this.createDialog(
      FormCategoryComponent,
      'Atualizar Categoria',
      data,
      inputValues
    );
  }
  deleteCategory(category: Category) {
    this.createDialog(DeleteCategoryComponent, 'Remover Categoria', {
      category,
    });
  }
  onSearchInput(event: Event) {
    this.dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: any) {
    table.clear();
    this.searchValue = '';
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  private fillTable() {
    this.categories = [];
    this.loading = true;
    this.categoryService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loading = false))
      )
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
  private createDialog(
    component: any,
    title: string,
    data?: any,
    inputValues?: any
  ) {
    this.ref = this.dialogService.open(component, {
      header: title,
      focusOnShow: false,
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data,
      inputValues,
    });

    this.ref.onClose.subscribe((data: boolean) => {
      if (data) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Operação realizada com sucesso!',
          life: 3000,
        });
        this.fillTable();
      }
    });
  }
}
