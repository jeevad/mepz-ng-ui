import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDepartmentComponent } from './template-department.component';

describe('TemplateDepartmentComponent', () => {
  let component: TemplateDepartmentComponent;
  let fixture: ComponentFixture<TemplateDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
