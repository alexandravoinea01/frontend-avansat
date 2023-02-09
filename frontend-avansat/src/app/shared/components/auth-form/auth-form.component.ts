import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  @Input()
  title!: string;

  @Output()
  authFormValue: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  authForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onClick() {
    this.authFormValue.emit(this.authForm.getRawValue());
  }
}
