import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedStudentComponent } from './placed-student.component';

describe('PlacedStudentComponent', () => {
  let component: PlacedStudentComponent;
  let fixture: ComponentFixture<PlacedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacedStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
