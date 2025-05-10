import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListDetailPageComponent } from './expense-list-detail-page.component';

describe('ExpenseListDetailPageComponent', () => {
  let component: ExpenseListDetailPageComponent;
  let fixture: ComponentFixture<ExpenseListDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseListDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseListDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
