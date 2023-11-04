import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsLineComponent } from './charts-line.component';

describe('ChartsLineComponent', () => {
  let component: ChartsLineComponent;
  let fixture: ComponentFixture<ChartsLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsLineComponent]
    });
    fixture = TestBed.createComponent(ChartsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
