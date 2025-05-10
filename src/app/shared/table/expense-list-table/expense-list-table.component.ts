import { Component, Input } from '@angular/core';
import { ExpenseDTO, ExpenseListDTO, UserAuthDTO } from '../../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list-table',
  templateUrl: './expense-list-table.component.html',
  styleUrl: './expense-list-table.component.scss',
})
export class ExpenseListTableComponent {
  @Input() expenses: ExpenseDTO[] = [];
  @Input() expenseLists: ExpenseListDTO[] = [];

  user?: UserAuthDTO;

  constructor(private router: Router) {}

  toDetailsPage(id: number) {
    this.router.navigate(['/expense-list', id]);
  }
}
