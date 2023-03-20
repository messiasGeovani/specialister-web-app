import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from '../core/services';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentPage: string;

  constructor(
    private route: ActivatedRoute,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(
      (data) => (this.currentPage = data['page'])
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleSubmit(event: any) {}
}
