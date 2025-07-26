import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { CategoryService } from '../../../shared/services/category.service';
import { DeleteCategoryComponent } from '../../components/dialogs/delete-category/delete-category.component';
import { FormCategoryComponent } from '../../components/dialogs/form-category/form-category.component';
import { PRIMENG_MODULES } from './primeng-modules';
import { Category } from '@fiap-pos-front-end/fiap-tc-shared';

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-category-list',
  imports: [CommonModule, ...PRIMENG_MODULES, FormsModule],
  templateUrl: './category-list.component.html',
  providers: [CategoryService, DialogService, MessageService],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private categoryService = inject(CategoryService);

  @ViewChild('dt') dt!: Table;

  private ref: DynamicDialogRef;
  readonly cols = signal<Column[]>([]);
  readonly categories = signal<Category[]>([]);

  loading = false;
  searchInput = signal<string>('');

  ngOnInit(): void {
    this.initializeColumns();
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

  onExportCsvClicked() {
    this.dt.exportCSV();
  }

  clear(table: any) {
    table.clear();
    this.searchInput.set('');
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  private initializeColumns() {
    this.cols.set([{ field: 'name', header: 'Categoria' }]);
  }

  private fillTable() {
    this.loading = true;
    this.categoryService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loading = false))
      )
      .subscribe((categories) => {
        this.categories.set(categories);
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
      closable: true,
      width: '30vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data,
      inputValues,
    });

    this.ref.onClose.subscribe((data: Category) => {
      if (data) {
        this.changeTable(title, data);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Operação realizada com sucesso!',
          life: 3000,
        });
      }
    });
  }

  private changeTable(title: string, data: Category) {
    title.includes('Adicionar')
      ? this.addTable(data)
      : title.includes('Atualizar')
      ? this.updTable(data)
      : this.delTable(data);
  }

  private addTable(data: Category) {
    this.categories.update((list) => [...list, data]);
  }

  private updTable(data: Category) {
    this.categories.update((list) =>
      list.map((cat) => (cat.id === data.id ? data : cat))
    );
  }

  private delTable(data: Category) {
    this.categories.update((list) => list.filter((cat) => cat.id !== data.id));
  }
}
