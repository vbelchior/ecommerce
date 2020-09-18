import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'mg-app',
	template: `
		<header>
			<th-header></th-header>
		</header>
		<section>
			<router-outlet></router-outlet>
		</section>
	`,
	styles: [
		`
			section {
				height: calc(100vh - 64px);
				overflow-y: auto;
			}
			@media (max-width: 599px) {
				section {
					height: 100vh;
					padding-top: 56px;
				}
				.mat-sidenav {
					margin-top: 56px;
				}
			}
		`
	]
})
export class AppComponent implements OnInit {
	constructor(public dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {}

	public ngOnInit(): void {}
}
