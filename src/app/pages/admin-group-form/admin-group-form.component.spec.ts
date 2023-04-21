import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupFormComponent } from './admin-group-form.component';

describe('AdminGroupFormComponent', () => {
  let component: AdminGroupFormComponent;
  let fixture: ComponentFixture<AdminGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
