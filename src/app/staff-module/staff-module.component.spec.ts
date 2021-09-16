import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffModuleComponent } from './staff-module.component';

describe('StaffModuleComponent', () => {
  let component: StaffModuleComponent;
  let fixture: ComponentFixture<StaffModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
