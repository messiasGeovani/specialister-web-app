import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.scss'],
})
export class FormAuthenticationComponent implements OnInit {
  @Output() submit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
