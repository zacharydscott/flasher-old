import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchingValidator(controlName: string, matchingControlName: string) {
	return (fg: FormGroup): ValidationErrors => {
			const control = fg.controls[controlName];
			if (!control) {
				throw new Error(`Control ${controlName} is not in the form group`);
			}
			const matchingControl = fg.controls[matchingControlName];
			if (!matchingControlName) {
				throw new Error(`Control ${matchingControlName} is not in the form group`);
			}
			return control.value !== matchingControl.value ? {controlsNotMatching: `${controlName} and ${matchingControlName} don't match`} : null;

	}
}
