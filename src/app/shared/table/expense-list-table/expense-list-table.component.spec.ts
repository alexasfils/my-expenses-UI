import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListTableComponent } from './expense-list-table.component';

describe('ExpenseListTableComponent', () => {
  let component: ExpenseListTableComponent;
  let fixture: ComponentFixture<ExpenseListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
