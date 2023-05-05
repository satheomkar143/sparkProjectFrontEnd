import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPhotoComponent } from './student-photo.component';

describe('StudentPhotoComponent', () => {
  let component: StudentPhotoComponent;
  let fixture: ComponentFixture<StudentPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
