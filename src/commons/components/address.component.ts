import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeDirective } from '../directives';

export interface AddressInterface {
	street: string;
	number: string;
	extra: string;
	area: string;
	code: string;
	city: string;
	state: string;
	country: string;
}

@Component({
	selector: 'th-address',
	template: `
		<div mat-dialog-title fxLayoutAlign="space-between center" *ngIf="showHeader">
			<h4>Endereço</h4>
			<button mat-icon-button (click)="onCancel()">
				<mat-icon>close</mat-icon>
			</button>
		</div>
		<mat-dialog-content fxLayout="row wrap" (keyup.enter)="onSave()">
			<div fxFlex="100" fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="0.5em">
				<mat-form-field fxFlex="30" fxFlex.lt-md="50">
					<input matInput [(ngModel)]="code" (blur)="onCodeBlur()" name="code" placeholder="CEP" maxlength="9" lsCode required />
				</mat-form-field>
				<span *ngIf="error" fxFlex="50">{{ error }}</span>
			</div>
			<div fxFlex="100" fxLayout="row">
				<mat-form-field fxFlex="100">
					<input matInput [(ngModel)]="address.street" name="street" placeholder="Logradouro" required />
				</mat-form-field>
			</div>
			<div fxFlex="100" fxLayout="row" fxLayoutGap="1em" fxLayout.lt-md="row wrap" fxLayoutGap.lt-md="0.5em">
				<mat-form-field fxFlex="30" fxFlex.lt-md="50">
					<input matInput [(ngModel)]="address.number" name="number" placeholder="Número" required />
				</mat-form-field>
				<mat-form-field fxFlex="70" fxFlex.lt-md="50">
					<input matInput [(ngModel)]="address.extra" name="extra" placeholder="Complemento" />
				</mat-form-field>
			</div>
			<div fxFlex="100" fxLayout="row" fxLayoutGap="0.5em" fxLayout.lt-md="row wrap" fxLayoutGap.lt-md="0">
				<mat-form-field fxFlex="50" fxFlex.lt-md="100">
					<input matInput [(ngModel)]="address.area" name="area" placeholder="Bairro" required />
				</mat-form-field>
				<mat-form-field fxFlex="50" fxFlex.lt-md="100">
					<input matInput [(ngModel)]="address.city" name="city" placeholder="Cidade" required />
				</mat-form-field>
			</div>
			<div fxFlex="100" fxLayout="row" fxLayoutGap="0.5em" fxLayout.lt-md="row wrap" fxLayoutGap.lt-md="0">
				<mat-form-field fxFlex="50" fxFlex.lt-md="100">
					<input matInput [(ngModel)]="address.state" name="state" placeholder="Estado" required />
				</mat-form-field>
				<mat-form-field fxFlex="50" fxFlex.lt-md="100">
					<input matInput [(ngModel)]="address.country" name="country" placeholder="País" required />
				</mat-form-field>
			</div>
		</mat-dialog-content>
		<mat-dialog-actions *ngIf="showFooter" align="end">
			<button mat-button color="primary" (click)="onClear()">LIMPAR</button>
			<button mat-button color="primary" (click)="onSave()">INSERIR</button>
		</mat-dialog-actions>
	`,
	styles: [
		`
			.head {
				margin-bottom: 1em;
			}
		`
	]
})
export class AddressComponent implements OnChanges, OnInit {
	@Input()
	public address: AddressInterface;

	@Input()
	public showHeader: boolean;

	@Input()
	public showFooter: boolean;

	public code: string;

	public error: string;

	constructor(@Inject(MAT_DIALOG_DATA) public data: AddressInterface, public dialogRef: MatDialogRef<AddressComponent>, private httpClient: HttpClient) {
		if (this.data !== null && this.data !== undefined) {
			this.address = this.address;
		}
		this.showHeader = true;
		this.showFooter = true;
	}

	public ngOnChanges(changes: SimpleChanges) {
		for (let propName in changes) {
			if (propName === 'address') {
				this.code = CodeDirective.format(this.address.code);
			}
		}
	}

	public ngOnInit() {
		if (this.address.code) {
			this.code = CodeDirective.format(this.address.code);
		} else {
			this.code = '';
		}
	}

	public onCancel(): void {
		this.dialogRef.close('CANCEL');
	}

	public onClear(): void {
		this.address.area = '';
		this.address.city = '';
		this.address.code = '';
		this.address.country = '';
		this.address.extra = '';
		this.address.number = '';
		this.address.state = '';
		this.address.street = '';
		this.code = '';
	}

	public onCodeBlur(): void {
		this.address.code = CodeDirective.parse(this.code);
		if (this.address.code.length != 8) {
			this.error = 'Número inválido';
			return;
		}
		let path = 'https://viacep.com.br/ws/' + this.address.code + '/json/';
		this.httpClient
			.get<any>(path)
			.toPromise()
			.then((response: any) => {
				if (!response) {
					this.error = 'Endereço não encontrado';
					return;
				}
				if (response.erro) {
					this.error = 'Endereço não encontrado';
					return;
				}
				this.error = null;
				this.address.area = response.bairro;
				this.address.city = response.localidade;
				this.address.country = 'Brasil';
				this.address.state = response.uf;
				this.address.street = response.logradouro;
			})
			.catch((error: any) => {
				console.error('onCodeBlur.ERROR: ', error); // FIXME
			});
	}

	public onSave(): void {
		this.dialogRef.close('INSERT');
	}
}
