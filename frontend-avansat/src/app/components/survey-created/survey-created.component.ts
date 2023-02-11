import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SurveysService} from "../../services/surveys.service";
import {SurveyModel} from "../../shared/models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-survey-created',
  templateUrl: './survey-created.component.html',
  styleUrls: ['./survey-created.component.scss']
})
export class SurveyCreatedComponent implements OnInit {

  surveys!: SurveyModel[];

  constructor(
    private router: Router,
    private surveysService: SurveysService
  ) {
  }

  ngOnInit(): void {
    this.setupSurveys();
  }

  createSurvey() {
    this.router.navigate(['profile', 'new-survey']);
  }

  private setupSurveys() {
    // @ts-ignore
    const email = JSON.parse(localStorage.getItem('user')).email;
    this.surveysService.getSurveys()
      .subscribe({
        next: res => {
          this.surveys = res
            .map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data() as {}
              } as SurveyModel
            })
            .filter(survey => survey.createdBy === email);
        }
      });
  }
}
