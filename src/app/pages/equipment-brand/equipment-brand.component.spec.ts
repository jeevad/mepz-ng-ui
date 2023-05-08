import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentBrandComponent } from './equipment-brand.component';

describe('EquipmentBrandComponent', () => {
  let component: EquipmentBrandComponent;
  let fixture: ComponentFixture<EquipmentBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
