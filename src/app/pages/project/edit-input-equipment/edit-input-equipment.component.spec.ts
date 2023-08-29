import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditInputEquipmentComponent } from './edit-input-equipment.component';


describe('EditInputEquipmentComponent', () => {
  let component: EditInputEquipmentComponent;
  let fixture: ComponentFixture<EditInputEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInputEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInputEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
