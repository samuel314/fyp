import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaCalcComponent } from './gpa-calc.component';

describe('GpaCalcComponent', () => {
  let component: GpaCalcComponent;
  let fixture: ComponentFixture<GpaCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpaCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
