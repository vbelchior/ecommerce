import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Alert {
	title: string;
	message: string;
	confirm: string;
	cancel: string;
}

@Component({
	selector: 'th-alert',
	template: `
		<div mat-dialog-title fxLayoutAlign="space-between center">
			<h3>{{ data.title }}</h3>
			<!-- <button mat-icon-button matDialogClose>
				<mat-icon>close</mat-icon>
			</button> -->
		</div>
		<mat-dialog-content fxLayout="row wrap">
			<div fxFlex="100">
				<p>{{ data.message }}</p>
			</div>
		</mat-dialog-content>
		<mat-dialog-actions align="end">
			<button *ngIf="hasCancel" mat-button color="primary" (click)="onCancel()">{{ data.cancel }}</button>
			<button *ngIf="hasConfirm" mat-button (click)="onConfirm()" color="warn">{{ data.confirm }}</button>
		</mat-dialog-actions>
	`
})
export class AlertComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: Alert, public dialogRef: MatDialogRef<AlertComponent>) {}

	public ngOnInit() {}

	public get hasCancel(): boolean {
		return this.data.cancel !== undefined && this.data.cancel.trim().length > 0;
	}

	public get hasConfirm(): boolean {
		return this.data.confirm !== undefined && this.data.confirm.trim().length > 0;
	}

	public onCancel(): void {
		this.dialogRef.close(false);
	}

	public onConfirm(): void {
		this.dialogRef.close(true);
	}
}
