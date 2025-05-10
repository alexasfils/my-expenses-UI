import { Component, Input } from '@angular/core';
import { ExpenseDTO, ExpenseListDTO } from '../../../types/types';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent {

    @Input() expenses: ExpenseDTO[] = [];
    @Input() totalExpense: number | null = null;

}
