import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEnquiryDataComponent } from './get-enquiry-data.component';

describe('GetEnquiryDataComponent', () => {
  let component: GetEnquiryDataComponent;
  let fixture: ComponentFixture<GetEnquiryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEnquiryDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetEnquiryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
