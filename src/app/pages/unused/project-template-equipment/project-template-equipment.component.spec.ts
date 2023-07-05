import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplateEquipmentComponent } from './project-template-equipment.component';

describe('ProjectTemplateEquipmentComponent', () => {
  let component: ProjectTemplateEquipmentComponent;
  let fixture: ComponentFixture<ProjectTemplateEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTemplateEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTemplateEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
