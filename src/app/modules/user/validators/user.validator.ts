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
        map(({ usernameAlreadyExists }) => {
          if (usernameAlreadyExists) {
            return { usernameAlreadyExists };
          }

          return null;
        }),
        catchError(async (error) => {
          console.error('[UserValidator::validateUsername]', error);
          return { verificationFailed: true };
        })
      );
    };
  }
}
