import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'th-warn',
	template: `
		<div fxFlex="100" fxLayout="row wrap" fxLayoutAlign="space-between space-between" class="warning-strip">
			<span fxFlex="100" class="warning-text">{{ message }}</span>
			<div *ngIf="hasActions" fxFlex="100" fxLayoutAlign="end" class="warning-buttons">
				<button mat-button (click)="onCancel()">CANCELAR</button>
				<button mat-button (click)="onConfirm()">CONTINUAR</button>
			</div>
		</div>
	`,
	styles: [
		`
			.warning-strip {
				background-color: #e81d62;
				padding: 1em 1em;
			}
			.warning-strip .warning-text {
				color: white;
			}
			.warning-strip .warning-buttons {
				color: white;
				padding-top: 8px;
				max-width: none !important;
				width: calc(100% + 48px);
				margin-bottom: -16px;
				margin-right: -16px;
			}
		`
	]
})
export class WarnComponent {
	@Output()
	public cancelClick: EventEmitter<void> = new EventEmitter();

	@Output()
	public confirmClick: EventEmitter<void> = new EventEmitter();

	@Input()
	public hasActions: boolean;

	@Input()
	public message: string;

	constructor() {}

	public onCancel(): void {
		this.cancelClick.emit();
	}

	public onConfirm(): void {
		this.confirmClick.emit();
	}
}
