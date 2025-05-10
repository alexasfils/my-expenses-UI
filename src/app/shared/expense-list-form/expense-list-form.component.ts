import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseListDTO, UserAuthDTO } from '../../types/types';
import { AuthService } from '../../services/auth/auth.service';
import { DemoService } from './../../services/demo/demo.service';
import { ExpenseListService } from '../../services/expenses/expense-list.service';

@Component({
  selector: 'app-expense-list-form',
  templateUrl: './expense-list-form.component.html',
  styleUrl: './expense-list-form.component.scss',
})
export class ExpenseListFormComponent {
  @Output() onCreatedList = new EventEmitter<ExpenseListDTO>();

  IsSowed = true;
  list: ExpenseListDTO | null = null;
  expenseListForm!: FormGroup;
  user?: UserAuthDTO;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private expenseListService: ExpenseListService,
    private demoService: DemoService
  ) {
    this.user = this.authService.getCurrentUser();

    this.expenseListForm = this.fb.group({
      name: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0.01)]],
      month: [0, [Validators.required, Validators.min(1), Validators.min(12)]],
    });
  }

  createList(expenseList: ExpenseListDTO) {
    expenseList = {
      id: 0, // o null/undefined, il backend assegnerà l’ID
      name: this.expenseListForm.value.name,
      month: this.expenseListForm.value.month, // valore di default o da input
      budget: this.expenseListForm.value.budget,
      totalExpense: 0.0,
      expenses: [], // array vuoto
    };

    const successCallback = (list: ExpenseListDTO) => {
      this.list = list;
      this.onCreatedList.emit(list); // 👈 notifica al componente genitore
      this.reset();
    };
    if (!this.user) {
      this.demoService
        .createExpenseList(expenseList)
        .subscribe(successCallback, () => {
          alert('È possibile creare solo una lista in modalità demo.');
        });
    } else {
      this.expenseListService
        .createExpenseList(expenseList)
        .subscribe(successCallback, (err) => {
          console.log('Falied to create expense list: ', err);
        });
    }
  }

  reset() {
    this.expenseListForm.reset();
    this.IsSowed = false;
  }
}
