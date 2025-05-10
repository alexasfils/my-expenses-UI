import { Component, OnInit } from '@angular/core';
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

  toDetailsPage(id: number) {
    this.router.navigate(['/expense-list', id]);
  }
}
