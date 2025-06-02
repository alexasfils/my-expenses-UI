import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ExpenseDTO,
  ExpenseListDTO,
  ExpenseListExtended,
  UserAuthDTO,
} from '../../../types/types';
import { Router } from '@angular/router';
import { ModalComponent } from '../../modals/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expense-list-table',
  templateUrl: './expense-list-table.component.html',
  styleUrl: './expense-list-table.component.scss',
})
export class ExpenseListTableComponent implements OnInit, OnChanges {
  @Input() expenses: ExpenseDTO[] = [];
  @Input() expenseLists: ExpenseListDTO[] = [];
  expencesListExtended: ExpenseListExtended[] = [];

  @Output() onDeleteList = new EventEmitter<number>();
  @Output() onUpdateExpenseList = new EventEmitter<ExpenseListDTO>();

  [key: string]: any;
  user?: UserAuthDTO;
  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseLists'] && changes['expenseLists'].currentValue) {
      this.loadExpenceListWithEditing();
    }
  }
  ngOnInit(): void {
    this.loadExpenceListWithEditing();
  }

  loadExpenceListWithEditing() {
    this.expencesListExtended = this.expenseLists.map(
      (expenceListExtended) => ({
        ...expenceListExtended,
        month: Number(expenceListExtended.month),
        isEditing: false,
      })
    );
  }

  startEditing(item: ExpenseListExtended) {
    item.isEditing = true;
  }

  toDetailsPage(id: number) {
    this.router.navigate(['/expense-list', id]);
  }

  removeList(id: number) {
    this.onDeleteList.emit(id);
  }

  openModal(callback: (id: number) => void, id: number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.message =
      'Are you sure you want to delete this list?';
    modalRef.result.then((result) => {
      if (result) {
        callback(id);
      }
    });
  }

  update(item: ExpenseListExtended) {
    if (!item.name.trim() && item.budget <= 0) {
      alert('Write element');
      return;
    }
    console.log('Updating item:', item);
    item.month = Number(item.month);

    item.isEditing = false;
    this.onUpdateExpenseList.emit(item);
  }

  cancel(item: ExpenseListExtended) {
    item.isEditing = false;
  }
}
