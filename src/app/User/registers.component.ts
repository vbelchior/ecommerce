import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RegisterModel } from '@commons/models';
import { RegisterService } from '@commons/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularUtil } from '@commons/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistersDataSource } from './registers.datasource';

@Component({
	selector: 'th-formularies',
	template: `
		<mat-card>
			<div fxLayout="row" fxLayoutAlign="space-between center" class="header">
				<h2>Registros</h2>
				<button mat-stroked-button color="accent" (click)="onCreate()">INCLUIR</button>
			</div>
			<table mat-table [dataSource]="dataSource">
				<ng-container matColumnDef="id">
					<th mat-header-cell *matHeaderCellDef>Código</th>
					<td mat-cell *matCellDef="let register">{{ register.id }}</td>
				</ng-container>
				<ng-container matColumnDef="date">
					<th mat-header-cell *matHeaderCellDef>Data</th>
					<td mat-cell *matCellDef="let register">{{ register.date }}</td>
				</ng-container>
				<!-- <ng-container matColumnDef="usuario">
					<th mat-header-cell *matHeaderCellDef>Usuário</th>
					<td mat-cell *matCellDef="let register"></td>
				</ng-container> -->
				<ng-container matColumnDef="priority">
					<th mat-header-cell *matHeaderCellDef>Prioridade</th>
					<td mat-cell *matCellDef="let register">{{ register.priority }}</td>
				</ng-container>
				<ng-container matColumnDef="risk">
					<th mat-header-cell *matHeaderCellDef>Risco</th>
					<td mat-cell *matCellDef="let register">{{ register.risk }}</td>
				</ng-container>
				<ng-container matColumnDef="status">
					<th mat-header-cell *matHeaderCellDef>Status</th>
					<td mat-cell *matCellDef="let register">{{ register.status }}</td>
				</ng-container>
				<tr mat-header-row *matHeaderRowDef="tableColumns"></tr>
				<tr mat-row *matRowDef="let register; columns: tableColumns" (click)="onSelect(register)"></tr>
			</table>
		</mat-card>
	`,
	styles: [
		`
			mat-card {
				margin: 16px;
			}
			.header {
				margin-bottom: 1em;
			}
			.header h2 {
				margin: 0px;
			}
			table {
				width: 100%;
			}
			.mat-row:hover {
				background-color: #f0f0f0;
				cursor: pointer;
			}
			.footer {
				margin: 0px 0px 0px 16px;
			}
			/* NAME */
			th mat-form-field.name {
				width: calc(100% - 24px);
			}
		`
	]
})
export class RegistersComponent implements OnInit {
	public tableColumns: string[];

	public dataSource: RegistersDataSource;

	public filterGroup: FormGroup;

	constructor(private registerService: RegisterService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
		this.tableColumns = ['id', 'date', 'priority', 'risk', 'status'];
		this.filterGroup = this.formBuilder.group({ name: [''], title: [''] });
	}

	private loadPage(keepIndex?: boolean): void {
		const fetchPromise: Promise<void> = this.dataSource.fetchRegisters(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
		Promise.all([fetchPromise])
			.then(([fetch]) => {})
			.catch(() => {
				this.snackBar.open('Algo inesperado ocorreu! Verifique sua conexão.', null, AngularUtil.makeSnackConfig('warn'));
			});
	}

	public ngOnInit(): void {
		this.dataSource = new RegistersDataSource(this.registerService, []);
		//this.filterGroup.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.loadPage());

		this.loadPage();
	}

	public onSelect(register: RegisterModel): void {
		this.router.navigate(['registers', register.id]);
	}

	public onCreate(): void {
		this.router.navigate(['registers', 'new']);
	}
}
