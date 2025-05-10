import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListFormComponent } from './expense-list-form.component';

describe('ExpenseListFormComponent', () => {
  let component: ExpenseListFormComponent;
  let fixture: ComponentFixture<ExpenseListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseListFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
