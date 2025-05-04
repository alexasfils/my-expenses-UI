import { Component } from '@angular/core';
import { ExpenseDTO, ExpenseListDTO } from '../../types/types';

@Component({
  selector: 'app-expenselistpage',
  templateUrl: './expenselistpage.component.html',
  styleUrl: './expenselistpage.component.scss',
})
export class ExpenselistpageComponent {
  expenseList: ExpenseListDTO | null = null;
  expenses: ExpenseDTO[] = [];
  
  getEgpesesLista() {
    
  }
}
