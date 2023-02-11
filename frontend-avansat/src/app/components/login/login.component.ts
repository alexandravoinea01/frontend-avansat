import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: AuthService
  ) {
  }

  async login(payload: { email: string, password: string }) {
    await this.firebaseService.login(payload.email, payload.password)
      .then(res => this.router.navigate(['home']))
  }
}
