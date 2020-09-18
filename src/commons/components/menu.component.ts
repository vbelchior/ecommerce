import { Component, Input } from '@angular/core';

@Component({
	selector: 'th-menu',
	template: `
		<div fxLayout="column">
			<nav fxFlex fxLayout="column">
				<a
					mat-button
					*ngFor="let item of items"
					[routerLink]="item.disabled ? null : item.link"
					[routerLinkActive]="item.disabled ? '' : 'active'"
					[ngClass]="{ wide: large, slim: !large, dark: dark }"
					[disabled]="item.disabled"
				>
					<mat-icon [matBadgeHidden]="!item.alarm" matBadge="!" matBadgePosition="above after" matBadgeColor="warn">{{ item.icon }}</mat-icon>
					<span *ngIf="large" class="item">{{ item.name }}</span>
				</a>
			</nav>
		</div>
	`,
	styles: [
		`
			a {
				border-radius: 0px;
			}
			a.active {
				background-color: #fafafa;
				color: #26d07c !important;
				font-weight: bold;
			}
			a.dark {
				background-color: #414141;
				color: #dfdfdf;
			}
			a.slim {
				line-height: 50px;
				padding: 0px 10px;
				min-width: 40px;
			}
			a.wide {
				line-height: 50px;
				text-align: left;
			}
			mat-toolbar {
				background-color: #fafafa;
				border-bottom: 1px solid #dfdfdf;
			}
			mat-toolbar.dark {
				background-color: #202020;
				color: #bcbcbc;
			}
			mat-toolbar-row.slim {
				padding: 0px 5px;
			}
			button.title {
				font-size: 16px;
				max-width: 200px;
				overflow: hidden;
				text-overflow: ellipsis;
				text-transform: uppercase;
			}
			span.item {
				font-size: 16px;
				margin-left: 10px;
			}
		`
	]
})
export class MenuComponent {
	@Input()
	public dark: boolean;

	// @Input()
	public items: any;

	@Input()
	public large: boolean;

	// @Input()
	// public options: any;

	@Input()
	public titleName: string;

	@Input()
	public titleLink: string;

	constructor() {
		this.titleName = '';
		this.large = true;
	}

	private setupMenu() {
		this.items = [];
	}
}
