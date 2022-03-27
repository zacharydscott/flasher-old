import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '../loader.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public failedLogin: boolean = false;
	public loginForm = this.fb.group({
		email: ['', {
			validators: [
				Validators.email,
				Validators.required
			]
		}],
		password: ['', {
			validators: [
				Validators.minLength(8)
			]
		}]
	});

  constructor(@Inject(MAT_DIALOG_DATA) private data: {close: () => void}, private userService: UserService, private fb: FormBuilder, private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  login() {
	  this.loaderService.setLoading();
	  this.userService.login(this.loginForm.value).subscribe({
		  next: (resp) => {
			  this.loaderService.releaseLoading();
			this.data.close();
		  },
		  error: (err) => {
			  this.loaderService.releaseLoading();
			  this.failedLogin = true;
		  }
	  });
  }


}
