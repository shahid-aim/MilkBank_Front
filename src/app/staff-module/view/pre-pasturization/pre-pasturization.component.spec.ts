import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePasturizationComponent } from './pre-pasturization.component';

describe('PrePasturizationComponent', () => {
  let component: PrePasturizationComponent;
  let fixture: ComponentFixture<PrePasturizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePasturizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePasturizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
