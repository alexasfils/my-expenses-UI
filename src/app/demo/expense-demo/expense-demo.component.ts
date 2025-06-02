import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../services/demo/demo.service';
import { ExpenseListDTO } from '../../types/types';

@Component({
  selector: 'app-expense-demo',
  templateUrl: './expense-demo.component.html',
  styleUrl: './expense-demo.component.scss',
})
export class ExpenseDemoComponent implements OnInit {
  showExpenseFormModal = false;
  IsSowed = false;
  expensesList: ExpenseListDTO[] = [];
  constructor(private demoService: DemoService) {}

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.demoService.getExpenseLists().subscribe((lists) => {
      console.log('expensesList', this.expensesList);
      this.expensesList = lists;
    });
  }

  deleteExpenseList(expenseListId: number) {
      this.demoService.deleteExpenseList(expenseListId).subscribe({
        next: () => {
          this.loadList();
          console.log('Demo List Deleted succesfully');
        },
        error: (err) => {
          console.log('Deleting falid', err);
        },
      });
    
  }
  showExpenseForm() {
    this.showExpenseFormModal = true;
  }

  onCreatedList(lista: ExpenseListDTO) {
    this.expensesList.push(lista);
  }

  onCreatedExpense() {
    this.loadList();
    this.showExpenseFormModal = false;
  }

  onCloseExpenseFormModal() {
    this.showExpenseFormModal = false;
  }
}
