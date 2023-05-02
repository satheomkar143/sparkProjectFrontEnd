import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStudentsDataComponent } from './get-students-data.component';

describe('GetStudentsDataComponent', () => {
  let component: GetStudentsDataComponent;
  let fixture: ComponentFixture<GetStudentsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStudentsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStudentsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
