import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SurveysService} from "../../services/surveys.service";
import {SurveyModel} from "../../shared/models";
import {map, Observable, switchMap} from "rxjs";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss']
})
export class TakeSurveyComponent implements OnInit {

  surveyId!: string;
  surveyId$!: Observable<string>;
  survey$!: Observable<SurveyModel>;

  surveyForm!: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private surveysService: SurveysService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.surveyId$ = this.activatedRoute.params
      .pipe(
        map(params => params['surveyId'])
      );

    this.surveyId$
      .subscribe(id => this.surveyId = id);

    this.survey$ = this.surveyId$
      .pipe(
        switchMap(id => this.surveysService.getSurveyById(id)),
      );

  }

  onClickCancel() {
    this.router.navigate(['surveys']);
  }

  isChecked(event: MatCheckboxChange, i: number, j: number, survey: SurveyModel) {
    survey.questions[i].answers[j].chosen = event.checked;
    survey.questions[i].answers.forEach((answer) => {
      if (answer != survey.questions[i].answers[j]) {
        answer.chosen = false;
      }
    })
  }

  validateSurvey(survey: SurveyModel): boolean {
    let isValid = false;
    for (let i = 0; i < survey.questions.length; i++) {
      isValid = false;
      for (let j = 0; j < survey.questions[i].answers.length; j++) {
        if (survey.questions[i].answers[j].chosen)
          isValid = true;
      }
      if (!isValid)
        return false;
    }
    return true;
  }

  submit(survey: SurveyModel) {
    if (this.validateSurvey(survey)) {
      for (let i = 0; i < survey.questions.length; i++) {
        for (let j = 0; j < survey.questions[i].answers.length; j++) {
          if (survey.questions[i].answers[j].chosen) {
            survey.questions[i].answers[j].count++;
          }
        }
      }
      for (let i = 0; i < survey.questions.length; i++) {
        for (let j = 0; j < survey.questions[i].answers.length; j++) {
          survey.questions[i].answers[j].chosen = false;
        }
      }

      this.surveysService.updateSurvey(survey, this.surveyId)
      // .then(res => {
      //   this.router.navigate(['surveys']);
      //   this.snackBar.open('Survey completed successfully.')
      // }, error => {
      //   this.snackBar.open('An error occurred.')
      // })
    } else alert('You must answer all of the questions');
  }
}
