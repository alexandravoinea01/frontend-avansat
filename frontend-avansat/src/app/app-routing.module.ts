import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {SurveyCreatedComponent} from "./components/survey-created/survey-created.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {SurveyFormComponent} from "./components/survey-form/survey-form.component";
import {SurveysComponent} from "./components/surveys/surveys.component";
import {TakeSurveyComponent} from "./components/take-survey/take-survey.component";
import {ResultsComponent} from "./components/results/results.component";
import {SurveysDoneComponent} from "./components/surveys-done/surveys-done.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: ':surveyId/results', component: ResultsComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'surveys', component: SurveysComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'surveys/:surveyId/take-survey', component: TakeSurveyComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'profile/surveys-created', component: SurveyCreatedComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'profile/surveys-done', component: SurveysDoneComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'profile/new-survey', component: SurveyFormComponent, canActivate: [AngularFireAuthGuard]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
