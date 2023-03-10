import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import * as constants from "constants";
import {CATEGORIES} from "../../shared";
import {AnswerModel, QuestionModel} from "../../shared/models";
import {SurveysService} from "../../services/surveys.service";

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  surveyForm!: FormGroup;

  titleControl!: FormControl;
  categoryControl!: FormControl;
  descriptionControl!: FormControl;
  questionsControl!: FormControl;

  categories: string[] = CATEGORIES;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private surveysService: SurveysService
  ) {
  }

  ngOnInit(): void {
    this.setupForm();
  }

  private setupForm() {
    this.surveyForm = this.fb.group({
      title: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
      respondents: [[]],
      questions: this.fb.array([])
    });

    this.titleControl = this.surveyForm.get('title') as FormControl;
    this.categoryControl = this.surveyForm.get('category') as FormControl;
    this.descriptionControl = this.surveyForm.get('description') as FormControl;

    this.addQuestion();
    this.addAnswer(0);
    this.addAnswer(0);
  }

  questions(): FormArray {
    return this.surveyForm.get("questions") as FormArray;
  }

  addQuestion() {
    const newQuestion = this.fb.group({
      text: '',
      answers: this.fb.array([])
    });
    this.questions().push(newQuestion);
  }

  removeQuestion(index: number) {
    this.questions().removeAt(index);
  }

  answersByQuestion(questionIndex: number): FormArray {
    return this.questions().at(questionIndex).get('answers') as FormArray;
  }

  addAnswer(index: number) {
    const newAnswer = this.fb.group({
      text: '',
      count: 0,
      chosen: false
    });
    this.answersByQuestion(index).push(newAnswer);
  }

  removeAnswerByQuestion(questionIndex: number, answerIndex: number) {
    this.answersByQuestion(questionIndex).removeAt(answerIndex);
  }

  createSurvey() {
    if (this.surveyForm.valid && this.runQuestionsValidations()) {
      this.surveysService.createSurvey(this.surveyForm.getRawValue())
        .then(res => this.router.navigate(['profile', 'surveys-created']))
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }

  private runQuestionsValidations() {
    let ok = true;
    const questions = this.surveyForm.getRawValue().questions;
    questions.forEach((question: QuestionModel) => {
      if (question.text === '') {
        ok = false;
        this.snackBar.open('You must complete all of the questions added.');
      } else if (question.answers.length < 2) {
        ok = false;
        this.snackBar.open('Every question must have at least 2 answers.');
      } else if (questions.filter((q: QuestionModel) => q.text === question.text).length > 1) {
        ok = false;
        this.snackBar.open('Two questions must not be the same.');
      }

      question.answers.forEach((answer) => {
        if (answer.text === '' && ok) {
          ok = false;
          this.snackBar.open('You must complete all of the answers added.');
        } else if (question.answers.filter(ans => ans.text === answer.text).length > 1 && ok) {
          ok = false;
          this.snackBar.open('Two answers for the same question must not be the same.');
        }
      });
    });

    return ok;
  }
}
