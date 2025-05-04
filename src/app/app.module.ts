import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoComponent } from './pages/demo/demo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NopageComponent } from './components/nopage/nopage.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExpenseDemoComponent } from './demo/expense-demo/expense-demo.component';
import { ExpenseListTableComponent } from './shared/table/expense-list-table/expense-list-table.component';
import { ExpenselistpageComponent } from './pages/expenselistpage/expenselistpage.component';

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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
