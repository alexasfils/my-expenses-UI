import { Component, OnInit } from '@angular/core';
import { ExpenseDTO, ExpenseListDTO, UserAuthDTO } from '../../types/types';
import { ExpenseListService } from '../../services/expenses/expense-list.service';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../../services/demo/demo.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-expense-list-detail-page',
  templateUrl: './expense-list-detail-page.component.html',
  styleUrl: './expense-list-detail-page.component.scss',
})
export class ExpenseListDetailPageComponent implements OnInit {
  expenseList: ExpenseListDTO | null = null;
  user?: UserAuthDTO;

  showExpenseFormModal = false;
  selectedList!: ExpenseListDTO;

  constructor(
    private expenseListService: ExpenseListService,
    private demoService: DemoService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.authService.userDTOSubject$.subscribe((user) => (this.user = user));
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getExpenseList(id);
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
      this.expenseListService.getExpenseById(id).subscribe({
        next: (list) => {
          this.expenseList = list;
          console.log('La lista caricata', this.expenseList);
        },
        error(err) {
          console.log('Falied to find list', err);
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
}
