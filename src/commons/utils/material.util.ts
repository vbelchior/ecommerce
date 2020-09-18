import { TypeUtil } from './type.util';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export class MaterialUtil {
	private static readonly SNACK_TIME: number = 5000;

	public static makeSnackConfig(): MatSnackBarConfig {
		let snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
		snackBarConfig.duration = MaterialUtil.SNACK_TIME;
		snackBarConfig.horizontalPosition = 'center';
		snackBarConfig.verticalPosition = 'bottom';
		return snackBarConfig;
	}
}
