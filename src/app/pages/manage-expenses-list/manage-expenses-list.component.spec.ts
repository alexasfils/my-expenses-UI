import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpensesListComponent } from './manage-expenses-list.component';

describe('ManageExpenseListComponent', () => {
  let component: ManageExpensesListComponent;
  let fixture: ComponentFixture<ManageExpensesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageExpensesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageExpensesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
