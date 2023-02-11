import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
  }
}
