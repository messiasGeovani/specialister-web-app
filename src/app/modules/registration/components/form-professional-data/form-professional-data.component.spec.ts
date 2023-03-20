import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfessionalDataComponent } from './form-professional-data.component';

describe('FormProfessionalDataComponent', () => {
  let component: FormProfessionalDataComponent;
  let fixture: ComponentFixture<FormProfessionalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProfessionalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProfessionalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
