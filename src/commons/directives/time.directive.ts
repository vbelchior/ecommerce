import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[thTime]' })
export class TimeDirective {
	private el: HTMLInputElement;

	constructor(private elementRef: ElementRef) {
		this.el = this.elementRef.nativeElement;
	}

	@HostListener('keyup', ['$event'])
	onKeyUp(event: any): void {
		if (event.keyCode == 8) return; // ignore backspace

		let lastChar = this.el.value[this.el.value.length - 1];
		if (isNaN(parseInt(lastChar))) {
			// only allow numbers
			this.el.value = this.el.value.substring(0, this.el.value.length - 1);
			return;
		}

		let newString: string = TimeDirective.format(event.target.value);
		if (newString != this.el.value) {
			this.el.value = newString;
		}
	}

	public static format(string: string): string {
		let cleanString: string = TimeDirective.parse(string);

		if (cleanString.length >= 2) {
			return cleanString.slice(0, 2) + ':' + cleanString.slice(2);
		} else {
			return cleanString;
		}
	}

	public static parse(string: string): string {
		if (string) return string.replace(/\D/g, '');
		else return '';
	}

	public static isValid(string: string): boolean {
		if (string == null || string == undefined) {
			return false;
		}

		let timeParts: Array<string> = string.split(':');

		if (timeParts.length != 2) {
			return false;
		}
		if (timeParts[0].length != 2 || timeParts[1].length != 2) {
			return false;
		}

		let hours: boolean = Number(timeParts[0]) >= 0 && Number(timeParts[0]) <= 23;
		let minutes: boolean = Number(timeParts[1]) >= 0 && Number(timeParts[1]) <= 59;

		return hours && minutes;
	}
}
