import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[thEmail]' })
export class EmailDirective {
	private el: HTMLInputElement;
	private static readonly EMAIL: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	constructor(private elementRef: ElementRef) {
		this.el = this.elementRef.nativeElement;
	}

	public static validate(text: string): boolean {
		return EmailDirective.EMAIL.test(text);
	}
}
