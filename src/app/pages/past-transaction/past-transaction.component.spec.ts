import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTransactionComponent } from './past-transaction.component';

describe('PastTransactionComponent', () => {
  let component: PastTransactionComponent;
  let fixture: ComponentFixture<PastTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
