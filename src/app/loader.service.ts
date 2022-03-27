import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {
	private loadingCount: number = 0;
	private loadingRef: MatDialogRef<LoadingScreen>;

	constructor(private matDialog: MatDialog) {
	}
	public setLoading() {
		this.loadingCount++;
		if (!this.loadingRef) {
			this.loadingRef = this.matDialog.open(LoadingScreen,{
				disableClose: true,
				panelClass: 'loading-screen'
			});
		}
	}
	public releaseLoading() {
		this.loadingCount--;
		if (this.loadingCount === 0) {
			this.loadingRef.close();
			this.loadingRef = null;
		}
		if (this.loadingCount < 0) {
			console.warn('Loading Service: Loading screen has been released more times than called.');
			this.loadingCount = 0;
		}
	}
}

@Component({
	template: `<mat-spinner></mat-spinner>`
})
export class LoadingScreen {}
