import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAllocationModalComponent } from './equipment-allocation-modal.component';

describe('EquipmentAllocationModalComponent', () => {
  let component: EquipmentAllocationModalComponent;
  let fixture: ComponentFixture<EquipmentAllocationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EquipmentAllocationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentAllocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
