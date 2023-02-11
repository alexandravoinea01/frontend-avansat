import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {QuestionModel, SurveyModel} from "../shared/models";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  private static readonly collectionName = 'surveys-collection'

  constructor(
    private angularFirestore: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  getSurveyById(id: string) {
    return this.angularFirestore
      .collection(SurveysService.collectionName)
      .doc(id)
      .valueChanges();
  }

  getSurveys() {
    return this.angularFirestore
      .collection(SurveysService.collectionName)
      .snapshotChanges();
  }

  createSurvey(survey: SurveyModel) {
    // @ts-ignore
    survey.createdBy = JSON.parse(localStorage.getItem('user')).email;
    return new Promise<any>((res, rej) => {
      this.angularFirestore
        .collection(SurveysService.collectionName)
        .add(survey)
        .then(res => {
          this.snackBar.open('Survey successfully created.')
          this.router.navigate(['profile', 'surveys-created'])
        }, error => {
          this.snackBar.open('An error occured.')
        })
    });
  }

  deleteSurvey(survey: SurveyModel) {
    return this.angularFirestore
      .collection(SurveysService.collectionName)
      .doc(survey.id)
      .delete();
  }

  updateSurvey(survey: SurveyModel, id: string) {
    return this.angularFirestore
      .collection(SurveysService.collectionName)
      .doc(id)
      .update({
        title: survey.title,
        category: survey.category,
        description: survey.description,
        questions: survey.questions
      });
  }
}
