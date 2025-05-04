import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemoService } from '../../services/demo/demo.service';
import { ExpenseDTO, ExpenseListDTO } from '../../types/types';

@Component({
  selector: 'app-expense-demo',
  templateUrl: './expense-demo.component.html',
  styleUrl: './expense-demo.component.scss',
})
export class ExpenseDemoComponent implements OnInit {
  IsSowed = false;
  list: ExpenseListDTO | null = null;
  expenses: ExpenseDTO[] = [];
  expenseListForm!: FormGroup;
  expenseForm!: FormGroup;

  constructor(private demoService: DemoService, private fb: FormBuilder) {
    this.expenseListForm = this.fb.group({
      name: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0.01)]],
      month: [0, [Validators.required, Validators.min(0.01)]],
    });

    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: [, [Validators.required]],
      description: [, [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.demoService.getExpenseLists().subscribe((lists) => {
      if (lists.length) {
        console.log('lists', lists);

        this.list = lists[0];
        this.loadExpenses();
      }
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
    this.demoService.createExpenseList(expenseList).subscribe(
      (list) => {
        this.list = list;
        this.loadExpenses();
      },
      (err) => {
        alert('È possibile creare solo una lista in modalità demo.');
      }
    );
  }

  loadExpenses() {
    if (this.list) {
      this.demoService.getExpenses(this.list.id).subscribe((data) => {
        this.expenses = data;
      });
    }
  }

  addExpense() {
    if (!this.expenseForm.valid || !this.list) {
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
    this.demoService
      .addExpense(this.list.id, expense)
      .subscribe((newExpense) => {
        this.expenses.push(newExpense);
        this.list!.totalExpense += newExpense.amount;
        this.expenseForm.reset({ name: '', amount: 0 });
      });
    this.IsSowed = false;
  }
  reset() {
    this.expenseForm.reset();
    this.IsSowed = false;
  }

  showExpenseForm() {
    this.IsSowed = true;
  }
}
