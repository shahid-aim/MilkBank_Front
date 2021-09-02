import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragFileComponent } from './drag-file.component';

describe('DragFileComponent', () => {
  let component: DragFileComponent;
  let fixture: ComponentFixture<DragFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
