import moment, { Moment } from 'moment-timezone';
import { deprecate } from 'util';

export class TypeUtil {
	private constructor() {} // prevent instantiation

	public static exists(value: any) {
		return value !== null && value !== undefined;
	}

	public static equals(left: any, right: any): boolean {
		return left === right;
	}

	public static equalsArray(left: Array<any>, right: Array<any>): boolean {
		if (left === null || left === undefined || right === null || right === undefined) return false;
		if (left.length !== right.length) return false;
		for (let index = 0; index < left.length; index++) {
			if (left[index] !== right[index]) return false;
		}
		return true;
	}

	public static equalsObject(left: object, right: object): boolean {
		if (!TypeUtil.exists(left) || !TypeUtil.exists(right)) {
			return left === right;
		}
		if (Object.keys(left).length !== Object.keys(right).length) return false;
		for (let index in left) {
			if (left[index] !== right[index]) return false;
		}
		return true;
	}

	public static equalsMoment(left: Moment, right: Moment): boolean {
		if (left === null || left === undefined || right === null || right === undefined) {
			return left === right;
		} else return left.isSame(right);
	}

	public static equalsString(left: string, right: string, ignoreCase?: boolean): boolean {
		if (left === null || left === undefined || right === null || right === undefined || ignoreCase) {
			return left === right;
		} else return left.toLowerCase() === right.toLowerCase();
	}

	// TODO: remove calls for this method
	public static isEmptyString(value: string) {
		return value === null || value === undefined || value.trim().length == 0;
	}

	public static isFullString(value: string, trim?: boolean) {
		if (trim) return value !== null && value !== undefined && value.trim().length > 0;
		else return value !== null && value !== undefined && value.length > 0;
	}

	public static isFullArray(value: any[]) {
		return value !== null && value !== undefined && value.length > 0;
	}

	public static isValidMoment(value: Moment): boolean {
		return value !== null && value !== undefined && moment(value).isValid();
	}

	public static safeUrlString(url: string): string {
		return url.replace(/\/|\+/g, '');
	}

	public static levenshteinDistance(left: string, right: string): number {
		const an = left ? left.length : 0;
		const bn = right ? right.length : 0;
		if (an === 0) {
			return bn;
		}
		if (bn === 0) {
			return an;
		}
		const matrix = new Array<number[]>(bn + 1);
		for (let i = 0; i <= bn; ++i) {
			let row = (matrix[i] = new Array<number>(an + 1));
			row[0] = i;
		}
		const firstRow = matrix[0];
		for (let j = 1; j <= an; ++j) {
			firstRow[j] = j;
		}
		for (let i = 1; i <= bn; ++i) {
			for (let j = 1; j <= an; ++j) {
				if (right.charAt(i - 1) === left.charAt(j - 1)) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] =
						Math.min(
							matrix[i - 1][j - 1], // substitution
							matrix[i][j - 1], // insertion
							matrix[i - 1][j] // deletion
						) + 1;
				}
			}
		}
		return matrix[bn][an];
	}
}
