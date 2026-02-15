import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CategoryDTO, ExpenseDTO, ExpenseExtended, UserAuthDTO } from '../../../types/types';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modals/modal/modal.component';
import { CategoriesService } from './../../../services/categories.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent implements OnInit, OnChanges {
  @Input() expenses: ExpenseDTO[] = [];
  @Input() totalExpense: number | null = null;
  expensesExtended: ExpenseExtended[] = [];
  categories!: CategoryDTO[];

  @Output() onDeleteList = new EventEmitter<number>();
  @Output() onUpdateExpense = new EventEmitter<ExpenseDTO>();
  [key: string]: any;
  @Input() user?: UserAuthDTO;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadExpenceListWithEditing();
    this.categoriesService.getAllCategories().subscribe((cats) => {
      this.categories = cats;
      console.log('Categorie caricate', cats);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses'] && changes['expenses'].currentValue) {
      this.loadExpenceListWithEditing();
    }
  }

  loadExpenceListWithEditing() {
    this.expensesExtended = this.expenses.map((expence) => ({
      ...expence,
      isEditing: false,
    }));
  }

  startEditing(item: ExpenseExtended) {
    item.isEditing = true;
  }

  removeList(id: number) {
    this.onDeleteList.emit(id);
  }

  openModal(callback: (id: number) => void, id: number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.message =
      'Are you sure you want to delete this expence?';
    modalRef.result.then((result) => {
      if (result) {
        callback(id);
      }
    });
  }

  update(item: ExpenseExtended) {
    if (!item.name.trim() && item.amount <= 0) {
      alert('Write element');
      return;
    }
    item.isEditing = false;
    this.onUpdateExpense.emit(item);
  }

  cancel(item: ExpenseExtended) {
    item.isEditing = false;
  }
}
