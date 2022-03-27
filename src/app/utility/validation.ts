import { FormGroup } from "@angular/forms";

export function groupErrors(group: FormGroup) {
	const errors = [];
	if (group.errors) {
		errors.push({control: null, errors: group.errors});
	}
	for (let controlName in group.controls) {
		const control = group.controls[controlName];
		if (control.errors) {
			errors.push({control: controlName, errors: control.errors});
		}
	}
	return errors;
}
