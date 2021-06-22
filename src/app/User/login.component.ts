import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PersonService } from '@commons/services';
import { AngularUtil } from './../../commons/utils/angular.util';

import { LoginInterface } from '@commons/services/person.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PersonModel } from '@commons/models';

@Component({
	selector: 'account-login',
	template: `
		<div fxLayout="row" fxLayoutAlign="center center">
			<mat-card fxFlex="40" fxFlex.lt-md="90">
				<mat-card-title>
					<h4>Logar</h4>
				</mat-card-title>
				<mat-card-content fxLayout="row wrap" [formGroup]="formGroup" (keyup.enter)="onLogin()">
					<span>Insira seu email e senha:</span>
					<div fxLayout="row" fxFlex="100">
						<mat-form-field fxFlex="100">
							<input matInput formControlName="user" placeholder="Usuário" required />
						</mat-form-field>
					</div>
					<div fxLayout="row" fxFlex="100">
						<mat-form-field fxFlex="100">
							<input matInput formControlName="secret" type="password" placeholder="Senha" required />
						</mat-form-field>
					</div>
				</mat-card-content>
				<mat-card-actions fxLayout="row" fxLayoutAlign="space-between">
					<button mat-button (click)="onSignup()">Cadastre-se</button>
					<button mat-button color="primary" (click)="onLogin()">
						<span>ENTRAR</span>
					</button>
				</mat-card-actions>
			</mat-card>
		</div>
	`,
	styles: [
		`
			mat-card {
				background: rgba(255, 255, 255, 0.9);
				margin-bottom: 1em;
				margin-top: 1em;
			}
			mat-card-actions[override] {
				max-width: none;
			}
		`
	]
})
export class LoginComponent implements OnInit {
	public formGroup: FormGroup;

	public login: LoginInterface;

	constructor(private formBuilder: FormBuilder, private personService: PersonService, private router: Router, private snackBar: MatSnackBar) {
		this.formGroup = this.formBuilder.group({
			user: ['', Validators.required],
			secret: ['', Validators.required]
		});
		this.login = { user: '', secret: '' };
	}
	private save(json: any) {
		this.login.user = json.user;
		this.login.secret = json.secret;
	}

	ngOnInit() {
		this.formGroup.valueChanges
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				map((group: any) => {
					return {
						user: group.user,
						secret: group.secret
					};
				})
			)
			.subscribe((json: any) => this.save(json));
	}

	public onSignup(): void {
		this.router.navigate(['signup']);
	}
	public onLogin(): void {
		if (!this.formGroup.valid) {
			return;
		} else {
			this.personService
				.login(this.login)
				.toPromise()
				.then((person: PersonModel) => {
					localStorage.setItem('personLogin', JSON.stringify(person));
					console.debug(new PersonModel(JSON.parse(localStorage.getItem('personLogin'))));

					this.router.navigate(['registers']);
				})
				.catch((error) => {
					//TODO: Handler Error
					console.error(error);
					this.snackBar.open('Falha ao realizar login!', null, AngularUtil.makeSnackConfig('warn'));
				});
		}
	}
}
