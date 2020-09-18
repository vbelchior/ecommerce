import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'th-picture',
	template: `
		<mat-card override>
			<div *ngIf="loading" fxLayout="row" fxLayoutAlign="center">
				<mat-spinner class="spinner-small"></mat-spinner>
			</div>
			<ng-container *ngIf="!loading">
				<img *ngIf="!picture" src="assets/img/camera-gray.png" />
				<img *ngIf="picture" [src]="picture | thTrust" />
				<div fxLayoutAlign="space-between">
					<input *ngIf="!picture" id="pictureInsert" type="file" accept="image/*" name="personImage" style="display: none;" placeholder="INSERIR" (change)="onUpload($event)" />
					<button *ngIf="!picture" mat-button (click)="onInsert()" [disabled]="!editable" fxFlexFill>INCLUIR</button>
					<button *ngIf="picture" mat-button (click)="onRemove()" [disabled]="!editable" fxFlexFill>EXCLUIR</button>
				</div>
			</ng-container>
		</mat-card>
	`,
	styles: [
		`
			.spinner-small {
				width: 50px;
				height: 50px;
			}
			mat-card[override] {
				padding: 0px;
			}
			img {
				width: 100%;
			}
		`
	]
})
export class PictureComponent {
	@Input()
	public editable: boolean;

	@Input()
	public loading: boolean;

	@Input()
	public picture: string;

	@Output()
	public pictureChange: EventEmitter<string> = new EventEmitter();

	public onInsert(): void {
		let hiddenElement: HTMLElement = document.getElementById('pictureInsert');
		hiddenElement.click();
	}

	public onRemove(): void {
		this.picture = null;
		this.pictureChange.emit(this.picture);
	}

	public onUpload($event: any): void {
		let inputValue = $event.target;

		let file: File = inputValue.files[0];
		let fileReader: FileReader = new FileReader();

		fileReader.onloadend = (e) => {
			this.picture = fileReader.result.toString();
			this.pictureChange.emit(this.picture);
		};

		fileReader.readAsDataURL(file);
	}
}
