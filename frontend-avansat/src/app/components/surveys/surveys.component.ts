import {Component, OnInit} from '@angular/core';
import {SurveyModel} from "../../shared/models";
import {SurveysService} from "../../services/surveys.service";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  surveys!: SurveyModel[];
  
  // @ts-ignore
  currentUser: string = JSON.parse(localStorage.getItem('user')).email;

  constructor(
    private surveysService: SurveysService
  ) {
  }

  ngOnInit(): void {
    this.setupSurveys();
  }

  private setupSurveys() {
    this.surveysService.getSurveys()
      .subscribe({
        next: res => {
          this.surveys = res
            .map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data() as {}
              } as SurveyModel
            });
        }
      });
  }
}
