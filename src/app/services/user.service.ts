import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const LOCAL_STORAGE_USER_REFRESH_ADDR = 'user_refresh_token';

export interface UserState {
	username: string,
	email: string,
	firstName: string,
	lastName: string
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	// User Auth tokens for interceptor
	private _userAuthToken: string;
	get userAuthToken(): string {
		return this._userAuthToken;
	};

	private _userAuthRefreshToken: string;
	get userAuthRefreshToken(): string {
		return this._userAuthRefreshToken;
	};

	// User state as normal object and stream for UI elements
	private _userState: UserState;
	get userState(): UserState {
		return this._userState;
	}
	set userState(v: UserState) {
		if (v === this._userState) {
			throw new Error('New states should be new objects. Do not mutate an existing object');
		}
		this._userState = v;
		this.userState$.next(v);
	}
	public userState$: BehaviorSubject<UserState>;

	constructor(private http: HttpClient) {
		const localUserString = localStorage.getItem('userData');
		if (localUserString) {
			this.userState = JSON.parse(localUserString);
		}
	}

	// private refreshUserData() {
	// 	this.http.get(environment.BASE_BACKEND + 'user/details/' + this.userState.email)
	// 	.subscribe((resp: any) => {
	// 		this.userState = resp.user;
	// 	});
	// }

	login(loginBody:{email: string, password: string}) {
		return this.http.post(environment.BASE_BACKEND + 'user/login', loginBody)
		.pipe(
			tap((resp: any) => {
				// store refresh for later login
				const refreshToken = resp.refreshToken;
				window.localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_ADDR, refreshToken);

				this._userAuthToken = resp.token;
				this.userState = resp.user;
			})
		);
	}

	signUp(signUpBody:{email: string, password: string}) {
		this.http.post(environment.BASE_BACKEND + 'user/signup', signUpBody)
		.pipe(
			tap((resp: any) => {
				// store refresh for later login
				const refreshToken = resp.refreshToken;
				window.localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_ADDR, refreshToken);

				this._userAuthToken = resp.token;
				this.userState = resp.user;
			})	
		);
	}

}
