import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'flash-focus';
	constructor(public dialog: MatDialog) {
	}


	public openLogin(): void {
		const dialogRef = this.dialog.open(LoginComponent, {
			width: '250px',
			data: {
				close: () => dialogRef.close()
			}
		})
	}
	public openSignUp(): void {
		const dialogRef = this.dialog.open(SignUpComponent, {
			width: '250px'
		})
	}
}
