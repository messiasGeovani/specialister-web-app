import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { UserService } from '../modules/user/services/user.service';
import { PageName } from '../shared/enums/page-name.enum';
import { TimerUtils } from '../shared/helpers';
import { PageMaps } from '../shared/maps/page.map';
import { ToastService } from '../shared/toast/services';
import { AuthenticatedUser } from './models/authenticated-user';
import { AuthenticationService } from './services/authentication.service';
import { TAuth } from './types/auth.type';
import { HttpStatus } from '../core/http/models/http-status';
import { ResponsiveService } from '../core/global/services';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  @ViewChild('formContainer') formContainer: ElementRef<HTMLDivElement>;

  subscription: Subscription;

  isFormSubmitted = false;
  isLoading = false;
  isSignUpPage = false;

  authData: TAuth;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe((data) => {
      const page = data['page'];

      this.isSignUpPage = page === 'sign-up';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(data: any) {
    const { username, password } = data;

    this.isFormSubmitted = true;
    this.isLoading = true;

    this.authData = {
      username: username.value || username,
      password: password.value || password,
    } as TAuth;

    this.sign(data);

    this.subscription.add(() => {
      this.isLoading = false;
    });
  }

  sign(data: any) {
    if (this.isSignUpPage) {
      this.subscription = this.userService
        .createUser(this.authData)
        .subscribe(this.mountSubscriptionOptions());

      return;
    }

    const { username, password } = data;

    this.subscription = this.authenticationService
      .Autenticate(this.authData)
      .subscribe(
        this.mountSubscriptionOptions(this.onSignInError(username, password))
      );
  }

  mountSubscriptionOptions(customErrorActions?: (error?: HttpStatus) => void) {
    const subscriptionOptions = {
      error: (error?: any) => {
        console.error('[Authentication]: ', error);
        this.toastService.showError(
          this.isSignUpPage ? 'Failed to sign up!' : 'Failed to sign in!'
        );

        if (customErrorActions) {
          customErrorActions(error);
        }
      },
    } as Subscriber<any>;

    if (this.isSignUpPage) {
      subscriptionOptions.complete = async () => {
        this.formContainer.nativeElement.classList.add(
          'animate__fadeOut',
          'animate__faster'
        );

        await TimerUtils.wait(500);

        this.router.navigate([PageMaps.get(PageName.Registration)]);
      };

      return subscriptionOptions;
    }

    subscriptionOptions.next = async (user: AuthenticatedUser) => {
      this.formContainer.nativeElement.classList.add(
        'animate__fadeOut',
        'animate__faster'
      );

      await TimerUtils.wait(500);

      if (!user.role) {
        this.router.navigate([PageMaps.get(PageName.Registration)]);
        return;
      }

      this.router.navigate([PageMaps.get(PageName.Registration)]);
    };

    return subscriptionOptions;
  }

  onSignInError(username: AbstractControl, password: AbstractControl) {
    return (error?: HttpStatus) => {
      if (error?.status !== 400) {
        return;
      }

      error?.errors?.map((err) => {
        console.error('[AbstractFormAuthentication]:', err);
        this.toastService.showError(err);
      });

      this.isFormSubmitted = false;

      username.setErrors({ incorrect: true });
      password.setErrors({ incorrect: true });
    };
  }
}
