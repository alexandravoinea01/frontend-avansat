import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysDoneComponent } from './surveys-done.component';

describe('SurveysDoneComponent', () => {
  let component: SurveysDoneComponent;
  let fixture: ComponentFixture<SurveysDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveysDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveysDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
