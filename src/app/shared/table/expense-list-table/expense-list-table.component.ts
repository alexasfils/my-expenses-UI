import { Component, Input } from '@angular/core';
import { ExpenseDTO, ExpenseListDTO } from '../../../types/types';

@Component({
  selector: 'app-expense-list-table',
  templateUrl: './expense-list-table.component.html',
  styleUrl: './expense-list-table.component.scss',
})
export class ExpenseListTableComponent {
  @Input() expenses: ExpenseDTO[] = [];
  @Input() list: ExpenseListDTO | null = null;
}
