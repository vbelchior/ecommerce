export class SystemUtil {
	private constructor() {} // prevent instantiation

	private static get system(): string {
		let macosPlatforms: Array<string> = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
		let windowsPlatforms: Array<string> = ['Win32', 'Win64', 'Windows', 'WinCE'];
		let iosPlatforms: Array<string> = ['iPhone', 'iPad', 'iPod'];
		let userAgent: string = window.navigator.userAgent;
		let platform: string = window.navigator.platform;

		if (windowsPlatforms.indexOf(platform) !== -1) return 'Windows';
		if (macosPlatforms.indexOf(platform) !== -1) return 'MacOS';
		if (iosPlatforms.indexOf(platform) !== -1) return 'iOS';
		if (/Android/.test(userAgent)) return 'Android';
		if (/Linux/.test(platform)) return 'Linux';
		return null; // undefined operating system
	}

	public static get isAndroid(): boolean {
		let operatingSystem: string = SystemUtil.system;
		return operatingSystem === 'Android';
	}

	public static get isIos(): boolean {
		let operatingSystem: string = SystemUtil.system;
		return operatingSystem === 'iOS';
	}

	public static get isMobile(): boolean {
		let operatingSystem: string = SystemUtil.system;
		return operatingSystem === 'Android' || operatingSystem === 'iOS';
	}
}
