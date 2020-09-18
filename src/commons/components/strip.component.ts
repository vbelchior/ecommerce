import { Component, Input, OnInit } from '@angular/core';

interface ItemInterface {
	label: string;
	route: string;
	style: string;
}

@Component({
	selector: 'th-strip',
	template: `
		<div fxLayout="row" fxLayoutAlign="space-between center" class="warning-strip">
			<span class="warning-text">{{ text }}</span>
			<a mat-raised-button *ngFor="let item of items" [routerLink]="item.route">{{ item.label }}</a>
		</div>
	`,
	styles: [
		`
			.warning-strip {
				background-color: #e81d62;
				padding: 0.5em 1em;
			}
			.warning-strip .warning-text {
				color: white;
			}
		`
	]
})
export class StripComponent implements OnInit {
	@Input()
	public text: string;

	@Input()
	public items: ItemInterface[];

	constructor() {}

	public ngOnInit(): void {}
}
