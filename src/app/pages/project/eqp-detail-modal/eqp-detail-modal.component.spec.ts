import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqpDetailModalComponent } from './eqp-detail-modal.component';

describe('EqpDetailModalComponent', () => {
  let component: EqpDetailModalComponent;
  let fixture: ComponentFixture<EqpDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EqpDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EqpDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
