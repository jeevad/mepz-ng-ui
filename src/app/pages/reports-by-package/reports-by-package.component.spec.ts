import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsByPackageComponent } from './reports-by-package.component';

describe('ReportsByPackageComponent', () => {
  let component: ReportsByPackageComponent;
  let fixture: ComponentFixture<ReportsByPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsByPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsByPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
