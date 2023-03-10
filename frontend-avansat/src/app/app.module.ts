import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthService} from "./services/auth.service";
import {HomeComponent} from './components/home/home.component';
import {AuthFormComponent} from './shared/components/auth-form/auth-form.component';
import {SideNavMenuComponent} from './shared/components/side-nav-menu/side-nav-menu.component';
import {SurveyCreatedComponent} from './components/survey-created/survey-created.component';
import {SurveyFormComponent} from "./components/survey-form/survey-form.component";
import {SurveyCardComponent} from './shared/components/survey-card/survey-card.component';
import {SurveysComponent} from './components/surveys/surveys.component';
import {TakeSurveyComponent} from './components/take-survey/take-survey.component';
import {ResultsComponent} from './components/results/results.component';
import {SurveysDoneComponent} from './components/surveys-done/surveys-done.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthFormComponent,
    SideNavMenuComponent,
    SurveyFormComponent,
    SurveyCreatedComponent,
    SurveyCardComponent,
    SurveysComponent,
    TakeSurveyComponent,
    ResultsComponent,
    SurveysDoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
