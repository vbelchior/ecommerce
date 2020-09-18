import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[thDate]' })
export class DateDirective {
	private el: HTMLInputElement;

	private static readonly DDMMYYYY = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;

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

		let newString: string = DateDirective.format(event.target.value);
		if (newString != this.el.value) {
			this.el.value = newString;
		}
	}

	public static format(text: string): string {
		let clean: string = DateDirective.parse(text);

		if (clean.length >= 4) {
			return clean.slice(0, 2) + '/' + clean.slice(2, 4) + '/' + clean.slice(4);
		} else if (clean.length >= 2) {
			return clean.slice(0, 2) + '/' + clean.slice(2);
		} else {
			return clean;
		}
	}

	public static parse(text: string): string {
		if (text) return text.replace(/\D/g, '');
		else return '';
	}

	public static validate(text: string): boolean {
		return DateDirective.DDMMYYYY.test(text);
	}
}
