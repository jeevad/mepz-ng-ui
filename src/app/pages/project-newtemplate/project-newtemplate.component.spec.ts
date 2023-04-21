import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNewtemplateComponent } from './project-newtemplate.component';

describe('ProjectNewtemplateComponent', () => {
  let component: ProjectNewtemplateComponent;
  let fixture: ComponentFixture<ProjectNewtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectNewtemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectNewtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
