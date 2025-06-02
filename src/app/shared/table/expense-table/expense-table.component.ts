import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ExpenseDTO,
  ExpenseExtended,
  ExpenseListDTO,
} from '../../../types/types';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent {
  @Input() expenses: ExpenseDTO[] = [];
  @Input() totalExpense: number | null = null;

  expensesExtended: ExpenseExtended[] = [];

  @Output() onDeleteList = new EventEmitter<number>();
  @Output() onUpdateExpenseList = new EventEmitter<ExpenseListDTO>();
}
