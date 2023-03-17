import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

export class UserValidator {
  static validateUsername(
    userService: UserService,
    abortValidation?: boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (abortValidation) {
        return null as unknown as Observable<ValidationErrors | null>;
      }

      return userService.checkIfUsernameExists(control.value).pipe(
        map(() => ({ usernameAlreadyExists: true })),
        catchError(async (error) =>
          error.status === 404
            ? {
                usernameAlreadyExists: false,
              }
            : null
        )
      );
    };
  }
}
