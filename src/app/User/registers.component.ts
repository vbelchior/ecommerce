import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RegisterModel } from '@commons/models';
import { RegisterService } from '@commons/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularUtil, TypeUtil } from '@commons/utils';
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
				<form [formGroup]="filterGroup">
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
						<th mat-header-cell *matHeaderCellDef>
							<mat-form-field appearance="outline" class="status small">
								<mat-select formControlName="priority" placeholder="Prioridade">
									<mat-option> </mat-option>
									<mat-option [value]="1"> Baixo </mat-option>
									<mat-option [value]="2"> Médio </mat-option>
									<mat-option [value]="3"> Alto </mat-option>
								</mat-select>
							</mat-form-field>
						</th>
						<td mat-cell *matCellDef="let register">{{ prioridade(register.priority) }}</td>
					</ng-container>
					<ng-container matColumnDef="risk">
						<th mat-header-cell *matHeaderCellDef>
							<mat-form-field appearance="outline" class="status small">
								<mat-select formControlName="risk" placeholder="Risco">
									<mat-option> </mat-option>
									<mat-option [value]="1"> Baixo </mat-option>
									<mat-option [value]="2"> Médio </mat-option>
									<mat-option [value]="3"> Alto </mat-option>
								</mat-select>
							</mat-form-field>
						</th>
						<td mat-cell *matCellDef="let register">{{ risco(register.risk) }}</td>
					</ng-container>
					<ng-container matColumnDef="status">
						<th mat-header-cell *matHeaderCellDef>
							<mat-form-field appearance="outline" class="status small">
								<mat-select formControlName="status" placeholder="Status">
									<mat-option> </mat-option>
									<mat-option [value]="0"> Fechado </mat-option>
									<mat-option [value]="1"> Aberto </mat-option>
									<mat-option [value]="2"> Em Andamento </mat-option>
								</mat-select>
							</mat-form-field>
						</th>
						<td mat-cell *matCellDef="let register">{{ status(register.status) }}</td>
					</ng-container>

					<ng-container matColumnDef="online">
						<th mat-header-cell *matHeaderCellDef>Sistema fora do Ar?</th>
						<td mat-cell *matCellDef="let register">{{ online(register.isOnline) }}</td>
					</ng-container>
					<tr mat-header-row *matHeaderRowDef="tableColumns"></tr>
					<tr mat-row *matRowDef="let register; columns: tableColumns" (click)="onSelect(register)"></tr>
				</form>
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
		this.tableColumns = ['id', 'date', 'priority', 'risk', 'status', 'online'];
		this.filterGroup = this.formBuilder.group({
			priority: [''],
			risk: [''],
			status: [''],
			description: ['']
		});
	}

	private loadPage(json?): void {
		const priority: number = AngularUtil.hasValue(this.filterGroup.controls.priority) ? this.filterGroup.controls.priority.value : undefined;
		const risk: number = AngularUtil.hasValue(this.filterGroup.controls.risk) ? this.filterGroup.controls.risk.value : undefined;
		const status: number = AngularUtil.hasValue(this.filterGroup.controls.status) ? this.filterGroup.controls.status.value : undefined;
		this.dataSource.fetchRegisters(undefined, undefined, undefined, status, risk, priority, undefined);
	}

	public ngOnInit(): void {
		this.dataSource = new RegistersDataSource(this.registerService, []);
		//this.filterGroup.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.loadPage());
		this.filterGroup.valueChanges
			.pipe(
				distinctUntilChanged(),
				map((group: any) => {
					return {
						priority: group.priority,
						risk: group.risk,
						status: group.status
					};
				})
			)
			.subscribe((json: any) => {
				this.loadPage();
			});
		this.loadPage();
	}

	public onSelect(register: RegisterModel): void {
		this.router.navigate(['registers', register.id]);
	}

	public onCreate(): void {
		this.router.navigate(['registers', 'new']);
	}

	public status(status: number): string {
		if (status == 0) {
			return 'Fechado';
		} else if (status == 1) {
			return 'Aberto';
		} else if (status == 2) {
			return 'Em Andamento';
		}
	}

	public risco(risco: number): string {
		if (risco == 1) {
			return 'Baixo';
		} else if (risco == 2) {
			return 'Médio';
		} else if (risco == 3) {
			return 'Alto';
		}
	}

	public prioridade(prioridade: number): string {
		if (prioridade == 1) {
			return 'Baixo';
		} else if (prioridade == 2) {
			return 'Médio';
		} else if (prioridade == 3) {
			return 'Alto';
		}
	}

	public online(online: number): string {
		if (online == 0) {
			return 'Nao';
		} else {
			return ' Sim';
		}
	}
}
