import moment from 'moment';
import { TypeUtil } from '../utils/type.util';

export class SessionStorage {
	public static readonly USER: string = 'user';

	public static readonly USER_LOGIN: string = 'user.login';

	public static readonly USER_PERMISSIONS: string = 'user.permissions';

	private static readonly USER_CENSUS: string = 'user.census';

	private constructor() {} // prevent instantiation

	public static get(key: string): string {
		return sessionStorage.getItem(key);
	}

	public static set(key: string, value: string) {
		sessionStorage.setItem(key.trim(), value.trim());
	}

	public static remove(key: string) {
		sessionStorage.removeItem(key.trim());
	}

	public static size(): number {
		return sessionStorage.length;
	}

	public static clear() {
		sessionStorage.clear();
	}

	public static get userPermissions(): string[] {
		return JSON.parse(sessionStorage.getItem(SessionStorage.USER_PERMISSIONS));
	}

	public static set userPermissions(value: string[]) {
		sessionStorage.setItem(SessionStorage.USER_PERMISSIONS, JSON.stringify(value));
	}

	public static get userCensus(): number {
		return Number(sessionStorage.getItem(SessionStorage.USER_CENSUS));
	}

	public static set userCensus(value: number) {
		sessionStorage.setItem(SessionStorage.USER_CENSUS, String(value));
	}
}
