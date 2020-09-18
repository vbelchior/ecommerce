import { MAT_SNACK_BAR_DATA, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { TypeUtil, MaterialUtil } from '@commons/utils';

enum SnackType {
	ERROR,
	SUCCESS,
	WARN
}

interface SnackData {
	type?: SnackType;
	message: string;
}

@Component({
	selector: 'th-snack',
	template: `
		<div fxLayoutAlign="start center">
			<mat-icon *ngIf="icon" [ngClass]="iconClasses">{{ icon }}</mat-icon>
			<span>{{ data.message }}</span>
		</div>
	`,
	styles: [
		`
			mat-icon.snack-icon {
				padding-right: 0.5em;
			}
			mat-icon.snack-error {
				color: red;
			}
			mat-icon.snack-warn {
				color: yellow;
			}
			mat-icon.snack-success {
				color: green;
			}
		`
	]
})
export class SnackComponent {
	private static readonly SNACK_ERROR: string = 'snack-error';

	private static readonly SNACK_WARN: string = 'snack-warn';

	private static readonly SNACK_SUCCESS: string = 'snack-success';

	private static readonly ERROR_ICON: string = 'error';

	private static readonly SUCCESS_ICON: string = 'check_circle';

	private static readonly WARN_ICON: string = 'warning';

	private static readonly ERROR_MESSAGE: string = 'Ocorreu um falha! Tente novamente.';

	private static readonly SUCCESS_MESSAGE: string = 'Ação concluída com sucesso!';

	private static readonly WARN_MESSAGE: string = 'Essa ação não é permitida!';

	public icon: string = null;

	public iconClasses: Array<string> = new Array<string>('snack-icon');

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackData) {
		if (SnackType.ERROR === this.data.type) {
			this.icon = SnackComponent.ERROR_ICON;
			this.iconClasses.push(SnackComponent.SNACK_ERROR);
		} else if (SnackType.SUCCESS === this.data.type) {
			this.icon = SnackComponent.SUCCESS_ICON;
			this.iconClasses.push(SnackComponent.SNACK_SUCCESS);
		} else if (SnackType.WARN === this.data.type) {
			this.icon = SnackComponent.WARN_ICON;
			this.iconClasses.push(SnackComponent.SNACK_WARN);
		}
	}

	public static makeSnackError(message: string): MatSnackBarConfig {
		message = TypeUtil.isFullString(message) ? message : SnackComponent.ERROR_MESSAGE;
		return {
			...MaterialUtil.makeSnackConfig(),
			data: {
				message,
				type: SnackType.ERROR
			}
		};
	}

	public static makeSnackSuccess(message: string): MatSnackBarConfig {
		message = TypeUtil.isFullString(message) ? message : SnackComponent.SUCCESS_MESSAGE;
		return {
			...MaterialUtil.makeSnackConfig(),
			data: {
				message,
				type: SnackType.SUCCESS
			}
		};
	}

	public static makeSnackWarn(message: string): MatSnackBarConfig {
		message = TypeUtil.isFullString(message) ? message : SnackComponent.WARN_MESSAGE;
		return {
			...MaterialUtil.makeSnackConfig(),
			data: {
				message,
				type: SnackType.WARN
			}
		};
	}
}
