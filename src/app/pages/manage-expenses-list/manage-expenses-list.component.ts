import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-expenses-list',
  templateUrl: './manage-expenses-list.component.html',
  styleUrl: './manage-expenses-list.component.scss',
})
export class ManageExpensesListComponent {
  isShowed: boolean = false;
  addExpenseList() {
    this.isShowed = true;
  }
}
