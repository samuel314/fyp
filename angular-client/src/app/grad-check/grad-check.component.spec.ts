import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradCheckComponent } from './grad-check.component';

describe('GradCheckComponent', () => {
  let component: GradCheckComponent;
  let fixture: ComponentFixture<GradCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
