import {Component, OnInit} from '@angular/core';
import {SurveyModel} from "../../shared/models";
import {Router} from "@angular/router";
import {SurveysService} from "../../services/surveys.service";

@Component({
  selector: 'app-surveys-done',
  templateUrl: './surveys-done.component.html',
  styleUrls: ['./surveys-done.component.scss']
})
export class SurveysDoneComponent implements OnInit {

  surveys!: SurveyModel[];

  constructor(
    private router: Router,
    private surveysService: SurveysService
  ) {
  }

  ngOnInit(): void {
    this.setupSurveys();
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
            .filter(survey => survey.respondents.includes(email));
        }
      });
  }
}
