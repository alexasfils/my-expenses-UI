import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenselistpageComponent } from './expenselistpage.component';

describe('ExpenselistpageComponent', () => {
  let component: ExpenselistpageComponent;
  let fixture: ComponentFixture<ExpenselistpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenselistpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenselistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
