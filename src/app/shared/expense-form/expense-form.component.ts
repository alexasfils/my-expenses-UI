import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseDTO, ExpenseListDTO, UserAuthDTO } from '../../types/types';
import { DemoService } from '../../services/demo/demo.service';
import { AuthService } from '../../services/auth/auth.service';
import { ExpenseService } from '../../services/expense/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent {
  @Output() onCreatedExpense = new EventEmitter<ExpenseDTO>();
  @Input() list!: ExpenseListDTO;
  @Input() IsSowed = true;
  @Output() close = new EventEmitter<void>();

  expenses: ExpenseDTO[] = [];
  expense: ExpenseDTO | null = null;
  expenseForm!: FormGroup;
  user?: UserAuthDTO;

  constructor(
    private expenseService: ExpenseService,
    private demoService: DemoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.authService.userDTOSubject$.subscribe(
      (user) => (this.user = user)
    );

    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  addExpense() {
    if (this.expenseForm.invalid || !this.list) {
      return;
    }
    const expense: ExpenseDTO = {
      name: this.expenseForm.value.name,
      amount: this.expenseForm.value.amount,
      expenseDate: this.expenseForm.value.date,
      categoryId: 1,
      description: this.expenseForm.value.description,
      expenseListId: this.list.id,
    };
    const onSuccess = (ex: ExpenseDTO) => {
      this.expense = ex;
      this.expenses.push(ex);
      if (this.list) {
        this.list.totalExpense += ex.amount;
      }
      this.onCreatedExpense.emit(ex);
      this.reset();
      this.closeModal();
    };
    if (!this.user) {
     this.demoService.addExpense(this.list.id, expense).subscribe(onSuccess);
    } else {
      this.expenseService.createExpense(expense).subscribe(onSuccess, (err) => {
        console.log('Falied to create expense list: ', err);
      });
    }

    this.IsSowed = false;
  }

  reset() {
    this.expenseForm.reset();
    this.IsSowed = false;
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
}
