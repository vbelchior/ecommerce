import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[thCode]' })
export class CodeDirective {
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

		let newString: string = CodeDirective.format(event.target.value);
		if (newString != this.el.value) {
			this.el.value = newString;
		}
	}

	public static format(string: string): string {
		let cleanString = CodeDirective.parse(string);

		if (cleanString.length >= 5) {
			return cleanString.slice(0, 5) + '-' + cleanString.slice(5);
		} else {
			return cleanString;
		}
	}

	public static parse(text: string): string {
		if (text) return text.replace(/\D/g, '');
		else return '';
	}
}
