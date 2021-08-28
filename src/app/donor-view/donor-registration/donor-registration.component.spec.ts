import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorRegistrationComponent } from './donor-registration.component';

describe('DonorRegistrationComponent', () => {
  let component: DonorRegistrationComponent;
  let fixture: ComponentFixture<DonorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
