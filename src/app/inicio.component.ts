import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'vf-inicio',
	template: `<h1>Olá Mundo!</h1>`,
	styles: [``]
})
export class InicioComponent implements OnInit {
	constructor(private router: Router, private snackBar: MatSnackBar) {}

	public ngOnInit(): void {}

	private navigate() {
		// 	this.router.navigate(['/termos']);
	}
}
