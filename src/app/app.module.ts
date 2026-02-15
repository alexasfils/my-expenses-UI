import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DemoComponent } from './pages/demo/demo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NopageComponent } from './components/nopage/nopage.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExpenseDemoComponent } from './demo/expense-demo/expense-demo.component';
import { ExpenseListTableComponent } from './shared/table/expense-list-table/expense-list-table.component';
import { ExpenselistpageComponent } from './pages/expenselistpage/expenselistpage.component';
import { AuthInterceptor } from './services/auth/auth.service';
import { ManageExpensesListComponent } from './pages/manage-expenses-list/manage-expenses-list.component';
import { ExpenseListFormComponent } from './shared/expense-list-form/expense-list-form.component';
import { ExpenseListDetailPageComponent } from './pages/expense-list-detail-page/expense-list-detail-page.component';
import { ExpenseFormComponent } from './shared/expense-form/expense-form.component';
import { ExpenseTableComponent } from './shared/table/expense-table/expense-table.component';
import { ModalComponent } from './shared/modals/modal/modal.component';
import { PaginationGridComponent } from './components/pagination-grid/pagination-grid.component';
import { ErrorInterceptor } from './services/exceptions/interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DemoComponent,
    NavbarComponent,
    NopageComponent,
    FooterComponent,
    ExpenseDemoComponent,
    ExpenseListTableComponent,
    ExpenselistpageComponent,
    ManageExpensesListComponent,
    ExpenseListFormComponent,
    ExpenseListDetailPageComponent,
    ExpenseFormComponent,
    ExpenseTableComponent,
    ModalComponent,
    PaginationGridComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Aggiunto per le animazioni dei popup
    ToastrModule.forRoot({
      // Aggiunto per configurare Toastr
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
