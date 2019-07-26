import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCompactViewComponent } from './score-compact-view.component';

describe('ScoreCompactViewComponent', () => {
  let component: ScoreCompactViewComponent;
  let fixture: ComponentFixture<ScoreCompactViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCompactViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCompactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
