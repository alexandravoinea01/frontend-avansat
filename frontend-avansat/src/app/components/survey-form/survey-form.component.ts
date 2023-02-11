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
      text: ''
    });
    this.answersByQuestion(index).push(newAnswer);
  }

  removeAnswerByQuestion(questionIndex: number, answerIndex: number) {
    this.answersByQuestion(questionIndex).removeAt(answerIndex);
  }

  createSurvey() {
    if (this.surveyForm.valid && this.runQuestionsValidations()) {
      this.surveysService.createSurvey(this.surveyForm.getRawValue())
    } else {
      this.snackBar.open('Each field must be completed. Every question must ' +
        'have at least 2 choices.');
    }
  }

  private runQuestionsValidations() {
    let ok = true;
    this.surveyForm.getRawValue().questions.forEach((question: QuestionModel) => {
      if (question.text === '' || question.answers.length < 2)
        ok = false;
      question.answers.forEach((answer) => {
        if (answer.text === '')
          ok = false;
      })
    });
    return ok;
  }
}
