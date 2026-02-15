import { Component } from '@angular/core';
import { ExpenseListDTO, UserAuthDTO } from '../../types/types';
import { ExpenseListService } from '../../services/expenses/expense-list.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expenselistpage',
  templateUrl: './expenselistpage.component.html',
  styleUrl: './expenselistpage.component.scss',
})
export class ExpenselistpageComponent {
  expenseLists: ExpenseListDTO[] = [];
  listToUpdate?: ExpenseListDTO;
  user?: UserAuthDTO;

  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private expenseListService: ExpenseListService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.authService.userDTOSubject$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.getExpesesLista();
  }

  getExpesesLista() {
    if (!this.expenseLists) {
      return;
    }

    if (this.user) {
      this.expenseListService
        .getAllUserExpensesLists(this.currentPage, 2)
        .subscribe({
          next: (list) => {
            this.expenseLists = [...list.content];
            console.log('lista caricata:', this.expenseLists);
            this.totalPages = list.totalPages;
          },
          error: (err) => {
            console.log(' Retrieving falid', err);
          },
        });
    }
  }

  deleteExpenseList(expenseListId: number) {
    if (this.user) {
      this.expenseListService.deleteExpenseListById(expenseListId).subscribe({
        next: () => {
          this.toast.success('List Deleted successfully', 'Success');
          this.getExpesesLista();
          console.log('List Deleted succesfully');
        },
        error: (err) => {
          console.log('Deleting falid', err);
          this.getExpesesLista();
        },
      });
    }
  }

  toDetailsPage(id: number) {
    this.router.navigate(['/expense-list', id]);
  }

  updateExpencceList(expenseList: ExpenseListDTO) {
    if (this.user) {
      this.expenseListService.updateUserExpenseList(expenseList).subscribe({
        next: (res) => {
          this.toast.success('List Updated successfully', 'Success');
          this.getExpesesLista();
          console.log('List Updated succesfully');
        },
        error: (err) => {
          console.error('Updating falid', err);
        },
      });
    }
  }

  onPageChange(currentPage: number) {
    this.currentPage = currentPage;
    this.getExpesesLista();
  }
}
