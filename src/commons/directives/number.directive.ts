import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[thNumber]' })
export class NumberDirective {
	private static readonly BACKSPACE_CODE: number = 8;

	private el: HTMLInputElement;

	private static readonly CPF = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;

	constructor(private elementRef: ElementRef) {
		this.el = this.elementRef.nativeElement;
	}

	@Input()
	thNumber: string;

	@HostListener('keyup', ['$event'])
	onKeyUp(event: any): void {
		// if (event.keyCode == NumberDirective.BACKSPACE_CODE) return;

		let lastChar = this.el.value[this.el.value.length - 1];
		if (isNaN(parseInt(lastChar))) {
			// only allow numbers
			this.el.value = this.el.value.substring(0, this.el.value.length - 1);
			return;
		}
		let newString: string = NumberDirective.format(event.target.value, this.thNumber);
		if (newString != this.el.value) {
			this.el.value = newString;
		}
	}

	public static format(string: string, type?: string): string {
		let cleanString = string.replace(/[^\*|\d]/g, ''); //Replaces non-numeric except *

		if (cleanString.length <= 11) {
			// CPF
			if (cleanString.length >= 9) {
				return cleanString.slice(0, 3) + '.' + cleanString.slice(3, 6) + '.' + cleanString.slice(6, 9) + '-' + cleanString.slice(9);
			} else if (cleanString.length >= 6) {
				return cleanString.slice(0, 3) + '.' + cleanString.slice(3, 6) + '.' + cleanString.slice(6);
			} else if (cleanString.length >= 3) {
				return cleanString.slice(0, 3) + '.' + cleanString.slice(3);
			} else {
				return cleanString;
			}
		} else {
			// CNPJ

			if (cleanString.length >= 12) {
				return cleanString.slice(0, 2) + '.' + cleanString.slice(2, 5) + '.' + cleanString.slice(5, 8) + '/' + cleanString.slice(8, 12) + -+cleanString.slice(12);
			} else if (cleanString.length >= 8) {
				return cleanString.slice(0, 2) + '.' + cleanString.slice(2, 5) + '.' + cleanString.slice(5, 8) + '/' + cleanString.slice(8);
			} else if (cleanString.length >= 5) {
				return cleanString.slice(0, 2) + '.' + cleanString.slice(2, 5) + '.' + cleanString.slice(5);
			} else if (cleanString.length >= 2) {
				return cleanString.slice(0, 2) + '.' + cleanString.slice(2);
			} else {
				return cleanString;
			}
		}
	}

	public static parse(string: string): string {
		if (string) return string.replace(/\D/g, '');
		else return '';
	}

	public static validate(text: string): boolean {
		return NumberDirective.CPF.test(text) && NumberDirective.validateCPF(text);
	}

	public static validateCPF(cpf: string): boolean {
		if (!cpf) return false;

		let sum: number;
		var rest: number;
		let cleanCPF: string = NumberDirective.parse(cpf);

		sum = 0;

		if (cleanCPF == '00000000000') return false;

		for (let i = 1; i <= 9; i++) sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
		rest = (sum * 10) % 11;

		if (rest == 10 || rest == 11) rest = 0;
		if (rest != parseInt(cleanCPF.substring(9, 10))) return false;

		sum = 0;
		for (let i = 1; i <= 10; i++) sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
		rest = (sum * 10) % 11;

		if (rest == 10 || rest == 11) rest = 0;
		if (rest != parseInt(cleanCPF.substring(10, 11))) return false;
		return true;
	}
}
