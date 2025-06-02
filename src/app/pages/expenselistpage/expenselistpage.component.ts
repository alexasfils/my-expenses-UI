import { Component} from '@angular/core';
import { ExpenseListDTO, UserAuthDTO } from '../../types/types';
import { ExpenseListService } from '../../services/expenses/expense-list.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-expenselistpage',
  templateUrl: './expenselistpage.component.html',
  styleUrl: './expenselistpage.component.scss',
})
export class ExpenselistpageComponent {
  expenseLists: ExpenseListDTO[] = [];
  listToUpdate?: ExpenseListDTO;
  user?: UserAuthDTO;

  constructor(
    private expenseListService: ExpenseListService,
    private authService: AuthService,
    private router: Router
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
      this.expenseListService.getAllUserExpensesLists().subscribe({
        next: (list) => {
          this.expenseLists = list;
          console.log('lista caricata:', this.expenseLists);
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
          this.getExpesesLista();
          console.log('List Deleted succesfully');
        },
        error: (err) => {
          console.log('Deleting falid', err);
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
          this.getExpesesLista();
          console.log('List Updated succesfully');
        },
        error: (err) => {
          console.error('Updating falid', err);
        },
      });
    }

    }
}
