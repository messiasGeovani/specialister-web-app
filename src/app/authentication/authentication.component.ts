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
  sub: Subscription;
  currentPage: string;

  constructor(
    private responsiveService: ResponsiveService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.route
      .data
      .subscribe(data => this.currentPage = data['page']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isMediumResolution() {
    const { isSmall, isXSmall, isMedium } = this.responsiveService;

    const isMobileOrTablet = isSmall || isXSmall;

    if (isMobileOrTablet && !isMedium) {
      return false;
    }

    return true;
  }

  handleSubmit(event: any) {}
}
