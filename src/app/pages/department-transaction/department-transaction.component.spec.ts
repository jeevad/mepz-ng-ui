import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTransactionComponent } from './department-transaction.component';

describe('DepartmentTransactionComponent', () => {
  let component: DepartmentTransactionComponent;
  let fixture: ComponentFixture<DepartmentTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
