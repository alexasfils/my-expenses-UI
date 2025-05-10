import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DemoComponent } from './pages/demo/demo.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NopageComponent } from './components/nopage/nopage.component';
import { ExpenselistpageComponent } from './pages/expenselistpage/expenselistpage.component';
import { ManageExpensesListComponent } from './pages/manage-expenses-list/manage-expenses-list.component';
import { ExpenseListDetailPageComponent } from './pages/expense-list-detail-page/expense-list-detail-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'expenses',
    component: ExpenselistpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expense-list/:id',
    component: ExpenseListDetailPageComponent

  },
  {
    path: 'manage-expenses',
    component: ManageExpensesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    component: ExpenselistpageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'demo', component: DemoComponent },
  { path: '**', component: NopageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
