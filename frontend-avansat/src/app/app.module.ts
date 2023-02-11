import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {FirebaseService} from "./services/firebase.service";
import {HomeComponent} from './components/home/home.component';
import {AuthFormComponent} from './shared/components/auth-form/auth-form.component';
import {SideNavMenuComponent} from './shared/components/side-nav-menu/side-nav-menu.component';
import {SurveyCreatedComponent} from './components/survey-created/survey-created.component';
import {SurveyFormComponent} from "./components/survey-form/survey-form.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthFormComponent,
    SideNavMenuComponent,
    SurveyFormComponent,
    SurveyCreatedComponent
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
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
