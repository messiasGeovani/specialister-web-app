import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpStatus } from 'src/app/core/models';
import { UserService } from '../services/user.service';

export class UserValidator {
  static validateUsername(
    userService: UserService,
    abortValidation?: boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (abortValidation) {
        return of(null);
      }

      return userService.checkIfUsernameExists(control.value).pipe(
        map(() => ({ usernameAlreadyExists: true })),
        catchError(async (error) => {
          const isHttpError = error instanceof HttpStatus;

          if (!isHttpError) {
            return null;
          }

          if (error.status === 404) {
            return null;
          }

          return of({ verificationFailed: true });
        })
      );
    };
  }
}
