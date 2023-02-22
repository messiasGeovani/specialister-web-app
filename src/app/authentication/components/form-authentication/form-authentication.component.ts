import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.scss'],
})
export class FormAuthenticationComponent implements OnInit {
  @Output() submit = new EventEmitter();

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  iconColors = {
    google: 'red',
    facebook: '#4267B2',
    linkedin: '#0e76a8'
  }

  constructor() {}

  ngOnInit(): void {}
}
