import { Component, OnInit } from '@angular/core';
import { ExpenseDTO, ExpenseListDTO, UserAuthDTO } from '../../types/types';
import { ExpenseListService } from '../../services/expenses/expense-list.service';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../../services/demo/demo.service';
import { AuthService } from '../../services/auth/auth.service';
import { ExpenseService } from '../../services/expense/expense.service';

@Component({
  selector: 'app-expense-list-detail-page',
  templateUrl: './expense-list-detail-page.component.html',
  styleUrl: './expense-list-detail-page.component.scss',
})
export class ExpenseListDetailPageComponent implements OnInit {
  expenseList: ExpenseListDTO | null = null;
  user?: UserAuthDTO;
  expenseListId?: number;

  currentPage: number = 0;
  totalPages: number = 0;

  showExpenseFormModal = false;
  selectedList!: ExpenseListDTO;

  constructor(
    private expenseListService: ExpenseListService,
    private expenseService: ExpenseService,
    private demoService: DemoService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.authService.userDTOSubject$.subscribe((user) => (this.user = user));
  }
  ngOnInit(): void {
    this.expenseListId = Number(this.route.snapshot.paramMap.get('id'));
    this.getExpenseList(this.expenseListId);
  }

  getExpenseList(id: number) {
    if (!this.user) {
      this.demoService.getExpenseListById(id).subscribe({
        next: (demoList) => {
          this.expenseList = demoList;
          console.log('lista caricata:', this.expenseList);
        },
        error: (err) => {
          console.log(' Retrieving falid', err);
        },
      });
    } else {
      //Da fixare Paginatore
      this.expenseListService.getExpenseById(id).subscribe({
        next: (list) => {
          this.expenseList = list;
          console.log('La lista caricata', this.expenseList);
          this.expenseService
            .getAllExpensesbyListId(id, this.currentPage, 2)
            .subscribe({
              next: (response) => {
                console.log('response.content', response.content);
                this.expenseList!.expenses = response.content;
                console.log('La lista caricata', this.expenseList!.expenses);
                this.totalPages = response.totalPages;
              },
              error(err) {
                console.log('Falied to find list', err);
              },
            });
        },
        error(err) {
          console.log('Falied to find list', err);
        },
      });
    }
  }

  updateExpense(expense: ExpenseDTO) {
    this.expenseService.updateUserExpense(expense).subscribe({
      next: () => {
        this.getExpenseList(this.expenseListId!);
        console.log('Expense Updated succesfully');
      },
      error: (err) => {
        console.error('Updating falid');
      },
    });
  }

  deleteExpense(id: number) {
    if (this.user) {
      this.expenseService.deleteExpenseById(id).subscribe({
        next: () => {
          this.getExpenseList(this.expenseListId!);
        },
        error: (err) => {
          console.log('Deleting falid', err);
        },
      });
    }
  }

  resetExpenseList(id: number) {
    if (this.user) {
      this.expenseService.deleteAllExpenses(id).subscribe({
        next: () => {
          this.getExpenseList(id);
        },
        error: (err) => {
          console.log('Deleting falid', err);
        },
      });
    }
  }

  openExpenseModalForm() {
    this.showExpenseFormModal = true;
  }

  onCloseExpenseFormModal() {
    this.showExpenseFormModal = false;
  }

  handleExpenseForm(list: ExpenseListDTO) {
    this.selectedList = list;
    this.showExpenseFormModal = true;
  }
  onExpenseCreated() {
    // Aggiorna la lista per vedere la nuova spesa
    if (this.expenseList) {
      this.getExpenseList(this.expenseList.id);
    }
    this.showExpenseFormModal = false;
  }

  onPageChange(currentPage: number) {
    this.currentPage = currentPage;
    this.getExpenseList(this.expenseList!.id);
  }
}
