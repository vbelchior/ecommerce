import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorage } from '../storages';
import { TypeUtil } from '@commons/utils';

interface ItemInterface {
	label: string;
	route: string;
	style: string;
}

@Component({
	selector: 'th-header',
	template: ` <mat-toolbar> </mat-toolbar> `,
	styles: [
		`
			mat-toolbar {
				background: #ffffff;
				color: #808080;
			}
			img.logo {
				height: 23px;
				width: auto;
			}
			img.mark {
				margin-left: 8px;
				margin-right: 8px;
			}
			img.photo {
				border-radius: 20px;
				height: 40px;
				width: 40px;
			}
			span.name {
				margin-right: 10px;
			}
		`
	]
})
export class HeaderComponent implements OnChanges {
	@Input()
	public link: string; // logo or icon link

	@Input()
	public logo: string; // full brand image

	@Input()
	public icon: string; // small brand image

	@Input()
	public mark: string; // paths separator

	@Input()
	public paths: string[]; // main breadcrumb

	@Input()
	public name: string; // user name

	@Input()
	public photo: string; // user picture

	@Input()
	public items: ItemInterface[]; // menu items

	constructor(private router: Router) {}

	public ngOnChanges(): void {}
}
