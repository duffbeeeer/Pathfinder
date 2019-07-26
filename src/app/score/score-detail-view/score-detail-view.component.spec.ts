import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDetailViewComponent } from './score-detail-view.component';

describe('ScoreDetailViewComponent', () => {
  let component: ScoreDetailViewComponent;
  let fixture: ComponentFixture<ScoreDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
