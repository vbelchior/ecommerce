import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[thPhone]' })
export class PhoneDirective {
	private el: HTMLInputElement;

	/* Validates: (XX) XXXX-XXXX or (XX) 9XXXX-XXXX */
	public static readonly BR_PHONE = /^(\([0-9][0-9]\) [9][0-9]{4}-[0-9]{4})|(\([0-9][0-9]\) [9][0-9]{3}-[0-9]{5})|(\([0-9][0-9]\) [9][0-9]{4}-[0-9]{3})|(\([0-9][0-9]\) [0-9]{4}-[0-9]{4})|([0-9]{11})|([0-9]{10})$/;

	constructor(private elementRef: ElementRef) {
		this.el = this.elementRef.nativeElement;
	}

	@HostListener('keyup', ['$event'])
	onKeyUp(event: any): void {
		if (event.keyCode == 8) return; // ignore backspace
		let lastChar = this.el.value[this.el.value.length - 1];
		if (isNaN(parseInt(lastChar)) && lastChar != ' ') {
			// only allow numbers
			this.el.value = this.el.value.substring(0, this.el.value.length - 1);
			return;
		}
		let newString: string = PhoneDirective.format(event.target.value);
		if (newString != this.el.value) {
			this.el.value = newString;
		}
	}

	public static format(string: string): string {
		let cleanString = string.replace(/[^\*|\d]/g, ''); //Replaces non-numeric except *
		if (cleanString.length == 11) {
			return '(' + cleanString.slice(0, 2) + ') ' + cleanString.slice(2, 7) + '-' + cleanString.slice(7);
		} else if (cleanString.length >= 6) {
			return '(' + cleanString.slice(0, 2) + ') ' + cleanString.slice(2, 6) + '-' + cleanString.slice(6);
		} else if (cleanString.length >= 2) {
			return '(' + cleanString.slice(0, 2) + ') ' + cleanString.slice(2);
		} else if (cleanString.length > 0) {
			return '(' + cleanString;
		} else {
			return cleanString;
		}
	}

	public static parse(string: string): string {
		if (string) return string.replace(/\D/g, '');
		else return '';
	}

	public static validate(text: string): boolean {
		return PhoneDirective.BR_PHONE.test(text);
	}
}
