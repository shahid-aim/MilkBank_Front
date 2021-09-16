import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasturisationComponent } from './pasturisation.component';

describe('PasturisationComponent', () => {
  let component: PasturisationComponent;
  let fixture: ComponentFixture<PasturisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasturisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasturisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
