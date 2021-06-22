import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { typeSourceSpan } from '@angular/compiler';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '@commons/components';
import { TypeUtil } from '@commons/utils';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { PersonModel, RegisterModel } from '@commons/models';
import { RegisterService } from '@commons/services';

export interface TemplateTransaction {
	label: string;
	value: number;
	tags: Array<string>;
}

@Component({
	selector: 'register',
	template: `
		<mat-card fxLayout="column">
			<div fxLayout="row" fxLayoutAlign="space-between center" class="header">
				<div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px">
					<button mat-icon-button (click)="onViewRegisters()">
						<mat-icon class="material-icons-outlined">arrow_backward</mat-icon>
					</button>
					<h2>Registro - {{ dateNow | date: 'dd/MM/yyyy' }}</h2>
				</div>
				<div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px">
					<!-- <button mat-stroked-button color="warn" (click)="onDelete()">EXCLUIR</button> -->
				</div>
			</div>

			<form fxLayout="column" [formGroup]="registerGroup">
				<div fxLayout="row" fxLayoutGap="2em">
					<mat-form-field fxFlex="18" appearance="outline">
						<mat-label>Prioridade</mat-label>
						<mat-select formControlName="priority" placeholder="Prioridade">
							<mat-option> </mat-option>
							<mat-option [value]="1"> Baixo </mat-option>
							<mat-option [value]="2"> Médio </mat-option>
							<mat-option [value]="3"> Alto </mat-option>
						</mat-select>
					</mat-form-field>
					<mat-form-field fxFlex="18" appearance="outline">
						<mat-label>Risco</mat-label>

						<mat-select formControlName="risk" placeholder="Risco">
							<mat-option> </mat-option>
							<mat-option [value]="1"> Baixo </mat-option>
							<mat-option [value]="2"> Médio </mat-option>
							<mat-option [value]="3"> Alto </mat-option>
						</mat-select>
					</mat-form-field>
					<mat-form-field fxFlex="18" appearance="outline">
						<mat-label>Status</mat-label>
						<mat-select formControlName="status" placeholder="Status">
							<mat-option> </mat-option>
							<mat-option [value]="0"> Fechado </mat-option>
							<mat-option [value]="1"> Aberto </mat-option>
							<mat-option [value]="2"> Em Andamento </mat-option>
						</mat-select>
					</mat-form-field>
				</div>
				<div fxLayoutGap="2em">
					<mat-form-field appearance="outline" fxFlex="40">
						<mat-label>Descrição</mat-label>
						<textarea matInput formControlName="description"></textarea>
					</mat-form-field>
					<mat-checkbox formControlName="isOnline" class="walan"> Sistema fora do ar</mat-checkbox>
				</div>
			</form>
			<div mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
				<button mat-button color="primary" (click)="onSave()">SALVAR</button>
			</div>
		</mat-card>
	`,
	styles: [
		`
			mat-card {
				margin: 16px;
			}

			div.mat-dialog-actions {
				margin: 0px;
			}
			.header {
				margin-bottom: 1em;
			}
			.header h2 {
				font-weight: bold;
				margin: 0px;
			}
			.walan {
				margin-top: 24px;
			}
		`
	]
})
export class RegisterComponent implements OnInit, AfterViewInit {
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	public register: RegisterModel;

	public registerGroup: FormGroup;

	public person: PersonModel;

	constructor(
		public dialog: MatDialog,
		private registerService: RegisterService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private router: Router
	) {
		this.registerGroup = this.formBuilder.group({
			priority: ['', Validators.required],
			risk: ['', Validators.required],
			status: ['', Validators.required],
			description: ['', Validators.required],
			isOnline: ['']
		});
		this.register = this.activatedRoute.snapshot.data.register;
		this.person = new PersonModel(JSON.parse(localStorage.getItem('personLogin')));
	}

	public ngOnInit(): void {
		this.registerGroup.setValue({
			priority: TypeUtil.exists(this.register.priority) ? this.register.priority : '',
			risk: TypeUtil.exists(this.register.risk) ? this.register.risk : '',
			status: TypeUtil.exists(this.register.status) ? this.register.status : '',
			description: TypeUtil.exists(this.register.description) ? this.register.description : '',
			isOnline: TypeUtil.exists(this.register.isOnline) ? this.register.isOnline : ''
		});
	}
	public ngAfterViewInit(): void {
		this.registerGroup.valueChanges
			.pipe(
				distinctUntilChanged(),
				map((group: any) => {
					return {
						priority: group.priority,
						risk: group.risk,
						status: group.status,
						description: group.description,
						isOnline: group.isOnline
					};
				})
			)
			.subscribe((json: any) => this.save(json));
	}

	public save(json: any): void {
		this.register = new RegisterModel(json);
	}

	// public editControlsValue(): void {
	// 	let inputs = this.transactionGroup.controls;
	// 	this._template.asObservable().subscribe((template: TemplateTransaction) => {
	// 		if (typeof inputs.label.value === 'object') {
	// 			inputs.value.setValue(template.value);
	// 			inputs.tags.get('list').setValue(template.tags);
	// 			//inputs.tags.setValue(template.tags);
	// 			//inputs.value.setValue(template.value);
	// 		}
	// 	});
	// }

	public onViewRegisters(): void {
		this.router.navigate(['registers']);
	}

	public onDelete(): void {}
	public onSave() {
		if (this.registerGroup.valid) {
			if (TypeUtil.exists(this.register.id)) {
				this.registerService
					.update(String(this.register.id), this.register)
					.toPromise()
					.then(() => {
						this.snackBar.open('Registro Criado');
					});
			} else {
				this.register.personId = this.person.id;
				console.debug(this.register);
				this.registerService
					.create(this.register)
					.toPromise()
					.then(() => {
						this.snackBar.open('Registro Alterado');
					});
			}
		} else {
			this.snackBar.open('Favor preencher todos os campos ');
		}
	}

	public get dateNow(): Date {
		return new Date();
	}
}
