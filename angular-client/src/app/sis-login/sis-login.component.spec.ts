import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SisLoginComponent } from './sis-login.component';

describe('SisLoginComponent', () => {
  let component: SisLoginComponent;
  let fixture: ComponentFixture<SisLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SisLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SisLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
