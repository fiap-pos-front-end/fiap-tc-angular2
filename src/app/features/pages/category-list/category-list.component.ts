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
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, firstValueFrom } from 'rxjs';
import { Category } from '../../../shared/models/category.model';
import { CategoryService } from '../../../shared/services/category.service';
import { DeleteCategoryComponent } from '../../components/dialogs/delete-category/delete-category.component';
import { FormCategoryComponent } from '../../components/dialogs/form-category/form-category.component';
import { PRIMENG_MODULES } from './primeng-modules';
@Component({
  selector: 'app-category-list',
  imports: [CommonModule, ...PRIMENG_MODULES, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  providers: [
    CategoryService,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly categoryService = inject(CategoryService);

  @ViewChild('dt') dt!: Table;

  private ref: DynamicDialogRef;
  readonly categories = signal<Category[]>([]);
  readonly selectedCategories = signal<Category[]>([]);

  loading = false;
  searchInput = signal<string>('');

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

  deleteMultipleCategories() {
    const selectedCategories = this.selectedCategories();
    if (!selectedCategories.length) return;

    this.confirmationService.confirm({
      message:
        'Você tem certeza que deseja deletar as categorias selecionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Não',
        severity: 'secondary',
        variant: 'text',
      },
      acceptButtonProps: { severity: 'danger', label: 'Sim' },
      accept: () => {
        Promise.all(
          selectedCategories.map((category) =>
            firstValueFrom(this.categoryService.delete(category.id))
          )
        )
          .then(() => {
            this.fillTable();
            this.selectedCategories.set([]);
          })
          .catch((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao deletar transações',
              life: 3000,
            });
          });

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ação realizada com sucesso',
          life: 3000,
        });
      },
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
