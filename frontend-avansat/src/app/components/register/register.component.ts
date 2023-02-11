import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: AuthService
  ) {
  }

  async signup(payload: { email: string, password: string }) {
    await this.firebaseService.signup(payload.email, payload.password)
      .then(res => this.router.navigate(['']))
  }
}
