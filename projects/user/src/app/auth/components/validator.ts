import { AbstractControl, ValidationErrors } from "@angular/forms";


export class Validator {
  static match(controlName: string, matchControlName: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      let control = group.get(controlName);
      let Matchcontrol = group.get(matchControlName);
      if (!control || !Matchcontrol) {
        return { controlNotFound: true }
      }
      const error = control.value === Matchcontrol.value ? null : { noMatch: true }
      Matchcontrol.setErrors(error)
      return error
    }
  }
}
