import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpenseDTO, ExpenseListDTO, UserAuthDTO } from '../../../types/types';
import { Router } from '@angular/router';
import { ModalComponent } from '../../modals/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expense-list-table',
  templateUrl: './expense-list-table.component.html',
  styleUrl: './expense-list-table.component.scss',
})
export class ExpenseListTableComponent {
  @Input() expenses: ExpenseDTO[] = [];
  @Input() expenseLists: ExpenseListDTO[] = [];

  @Output() onDeleteList = new EventEmitter<number>();

  [key: string]: any;
  user?: UserAuthDTO;

  constructor(private router: Router, private modalService: NgbModal) {}

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
}
