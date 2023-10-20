import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsBarComponent } from './charts-bar.component';

describe('ChartsBarComponent', () => {
  let component: ChartsBarComponent;
  let fixture: ComponentFixture<ChartsBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsBarComponent]
    });
    fixture = TestBed.createComponent(ChartsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
