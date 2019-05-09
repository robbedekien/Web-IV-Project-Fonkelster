import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOperationsComponent } from './activity-operations.component';

describe('ActivityOperationsComponent', () => {
  let component: ActivityOperationsComponent;
  let fixture: ComponentFixture<ActivityOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
