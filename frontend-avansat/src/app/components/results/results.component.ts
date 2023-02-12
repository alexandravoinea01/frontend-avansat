import {Component, OnInit} from '@angular/core';
import {map, Observable, switchMap} from "rxjs";
import {SurveyModel} from "../../shared/models";
import {SurveysService} from "../../services/surveys.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  survey$!: Observable<SurveyModel>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private surveysService: SurveysService
  ) {
  }

  ngOnInit(): void {
    const surveyId$ = this.activatedRoute.params
      .pipe(
        map(params => params["surveyId"])
      );
    this.survey$ = surveyId$.pipe(
      switchMap(id => this.surveysService.getSurveyById(id))
    );
  }

  back() {
    this.router.navigate(['surveys']);
  }
}
