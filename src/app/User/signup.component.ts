import { AngularUtil } from './../../commons/utils/angular.util';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PersonModel } from '@commons/models';
import { PersonService } from '@commons/services';

@Component({
	selector: 'account-signup',
	template: `
		<div fxLayout="row" fxLayoutAlign="center center">
			<mat-card fxFlex="40" fxFlex.lt-md="90">
				<mat-card-title>
					<h4>Bem vindo!</h4>
				</mat-card-title>

				<mat-card-content fxLayout="row wrap" [formGroup]="formGroup" (keyup.enter)="onSignup()">
					<span>Insira os dados abaixo</span>
					<div fxLayout="row" fxFlex="100" fxLayoutAlign="space-between">
						<mat-form-field fxFlex="48">
							<input matInput formControlName="name" placeholder="Nome" required />
						</mat-form-field>
						<mat-form-field fxFlex="48">
							<input matInput formControlName="nickname" placeholder="Apelido" required />
						</mat-form-field>
					</div>
					<div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
						<mat-form-field fxFlex="48">
							<input matInput formControlName="secret" type="password" placeholder="Senha" required />
						</mat-form-field>
						<mat-form-field fxFlex="48">
							<input matInput formControlName="secretConfirmation" type="password" placeholder="Confirmação Senha" required />
						</mat-form-field>
					</div>
					<div fxLayout="row" fxFlex="100" fxLayoutAlign="space-between">
						<mat-form-field fxFlex="48">
							<input matInput formControlName="user" placeholder="Usuário" required />
						</mat-form-field>
						<mat-select fxFlex="48" formControlName="type" placeholder="Tipo de usuário" class="select">
							<mat-option> </mat-option>
							<mat-option value="A"> Atendente </mat-option>
							<mat-option value="G"> Gerente </mat-option>
							<mat-option value="S"> Suporte </mat-option>
						</mat-select>
					</div>
				</mat-card-content>
				<mat-card-actions fxLayout="row" fxLayoutAlign="space-between">
					<button mat-button (click)="onLogin()">Já possui conta?</button>
					<button mat-button color="primary" (click)="onSignup()">
						<span>CRIAR CONTA</span>
					</button>
				</mat-card-actions>
			</mat-card>
		</div>
	`,
	styles: [
		`
			.select {
				margin-top: 1em;
			}
			a {
				text-decoration: none;
				color: limegreen;
			}
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
export class SignupComponent {
	public formGroup: FormGroup;
	public _answer: BehaviorSubject<boolean>;

	public personEntity: PersonModel;

	constructor(private formBuilder: FormBuilder, private personService: PersonService, private router: Router, private snackBar: MatSnackBar) {
		this.formGroup = this.formBuilder.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			user: ['', Validators.required],
			secret: ['', Validators.required],
			secretConfirmation: ['', Validators.required],
			type: ['', Validators.required]
		});
	}

	private async setupAccount(): Promise<void> {
		return Promise.resolve();
	}

	public async onSignup(): Promise<void> {
		if (this.formGroup.controls.secret.value !== this.formGroup.controls.secretConfirmation.value) {
			this.formGroup.controls.secretConfirmation.setErrors({ required: true });
			this.snackBar.open('Senha errada');
			return;
		}
		if (this.formGroup.valid) {
			this.personEntity = new PersonModel({
				name: this.formGroup.controls.name.value,
				nickname: this.formGroup.controls.nickname.value,
				user: this.formGroup.controls.user.value,
				password: this.formGroup.controls.secretConfirmation.value,
				type: this.formGroup.controls.type.value
			});
			this.personService
				.create(this.personEntity)
				.toPromise()
				.then()
				.catch((error) => {
					console.error(error);
				});
			return;
		} else {
			this.snackBar.open('Favor preencher todos os campos do formulário');
			return;
		}
	}

	public onLogin(): void {
		this.router.navigate(['login']);
	}
}
