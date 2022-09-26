import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidator {
  static MatchPasswordValidator(password: string, confirmPassword: string): ValidationErrors | null {
    return (group: AbstractControl):  ValidationErrors | null => {
      const passwordVal = group.get(password).value;
      const confirmPasswordVal = group.get(confirmPassword).value;

      return passwordVal === confirmPasswordVal ? null : { misMatch: true };
    };
  }

  static OnlyWhiteSpaceValidator(): ValidatorFn {
    return (c: AbstractControl):  ValidationErrors | null  => {
      if (c.value) {
        if (c.value.trim()) {
          return null;
        }
      }

      return { onlyWhiteSpace: true};
    };
  }
}
