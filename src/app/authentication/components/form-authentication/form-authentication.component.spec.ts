import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuthenticationComponent } from './form-authentication.component';

describe('FormAuthenticationComponent', () => {
  let component: FormAuthenticationComponent;
  let fixture: ComponentFixture<FormAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
