import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidator {
  static MatchPasswordValidator(password: string, confirmPassword: string): ValidationErrors | null {
    return (group: AbstractControl):  ValidationErrors | null => {
      const passwordVal = group.get(password).value;
      const confirmPasswordVal = group.get(confirmPassword).value;

      // tslint:disable-next-line:no-null-keyword
      return passwordVal === confirmPasswordVal ? null : { misMatch: true };
    };
  }
}