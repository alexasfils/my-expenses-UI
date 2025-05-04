import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDemoComponent } from './expense-demo.component';

describe('ExpenseDemoComponent', () => {
  let component: ExpenseDemoComponent;
  let fixture: ComponentFixture<ExpenseDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
