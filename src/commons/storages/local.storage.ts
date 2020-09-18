export class LocalStorage {
	private static readonly TOKEN_ACCESS: string = 'token.access';

	private static readonly TOKEN_REFRESH: string = 'token.refresh';

	private static readonly USER_LOCALE: string = 'user.locale';

	private static readonly USER_TIMEZONE: string = 'user.timezone';

	private constructor() {} // prevent instantiation

	public static get(key: string): string {
		return localStorage.getItem(key);
	}

	public static set(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	public static remove(key: string) {
		localStorage.removeItem(key);
	}

	public static size(): number {
		return localStorage.length;
	}

	public static clear() {
		localStorage.clear();
	}

	public static get accessToken(): string {
		return localStorage.getItem(LocalStorage.TOKEN_ACCESS);
	}

	public static set accessToken(value: string) {
		localStorage.setItem(LocalStorage.TOKEN_ACCESS, value);
	}

	public static get refreshToken(): string {
		return localStorage.getItem(LocalStorage.TOKEN_REFRESH);
	}

	public static set refreshToken(value: string) {
		localStorage.setItem(LocalStorage.TOKEN_REFRESH, value);
	}

	public static get userLocale(): string {
		return localStorage.getItem(LocalStorage.USER_LOCALE);
	}

	public static set userLocale(value: string) {
		localStorage.setItem(LocalStorage.USER_LOCALE, value);
	}

	public static get userTimezone(): string {
		return localStorage.getItem(LocalStorage.USER_TIMEZONE);
	}

	public static set userTimezone(value: string) {
		localStorage.setItem(LocalStorage.USER_TIMEZONE, value);
	}
}
