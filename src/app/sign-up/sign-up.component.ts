import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { matchingValidator } from '../utility/validators';

@Component({
	selector: 'app-login',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	public signUpForm = this.fb.group({
		email: ['', {
			validators: [
				Validators.email
			]
		}],
		username: ['', {
			validators: [
				Validators.pattern('/[A-z0-9._]{5,}/')
			]
		}],
		firstName: ['', {
			validators: [
				Validators.pattern('/[A-z]+/')
			]
		}],
		lastName: ['', {
			validators: [
				Validators.pattern('/[A-z]+/')
			]
		}],
		password: ['', {
			validators: [
				Validators.min(8)
			]
		}],
		confirmPassword: ['', {
			validators: [
				Validators.min(8)
			]
		}]
	},{
			validators: matchingValidator('password','confirmPassword')
		}
	)
	public takenEmails: string[] = [];

	constructor(private http: HttpClient, private fb: FormBuilder) {}

	ngOnInit(): void {}
	signUp() {
		const values = {...this.signUpForm.value};
		this.http.post(environment.BASE_BACKEND + 'user/signup', values)
		.subscribe({
			next: (resp) => {
		},
		error: (error) => {
			this.takenEmails.push(values.email);
		}
		});
	}
}
