import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AFrameComponent } from './a-frame.component';

describe('AFrameComponent', () => {
  let component: AFrameComponent;
  let fixture: ComponentFixture<AFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
