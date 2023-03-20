import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkIconComponent } from './work-icon.component';

describe('WorkIconComponent', () => {
  let component: WorkIconComponent;
  let fixture: ComponentFixture<WorkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
