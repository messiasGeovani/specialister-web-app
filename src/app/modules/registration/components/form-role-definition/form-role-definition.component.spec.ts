import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRoleDefinitionComponent } from './form-role-definition.component';

describe('FormRoleDefinitionComponent', () => {
  let component: FormRoleDefinitionComponent;
  let fixture: ComponentFixture<FormRoleDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRoleDefinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRoleDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
