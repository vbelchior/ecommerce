export class CookieStorage {
	private constructor() {} // prevent instantiation

	public static getCookie(name: string) {
		let key = name + '=';
		let cookies = decodeURIComponent(document.cookie);
		let collection = cookies.split(';');

		for (let i = 0; i < collection.length; i++) {
			let element = collection[i];
			while (element.charAt(0) == ' ') {
				element = element.substring(1);
			}
			if (element.indexOf(key) == 0) {
				return element.substring(key.length, element.length);
			}
		}

		return '';
	}

	public static setCookie(name: string, value: string, days: number) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		let expire = 'expires=' + date.toUTCString();
		document.cookie = name + '=' + value + ';' + expire + ';path=/';
	}
}
