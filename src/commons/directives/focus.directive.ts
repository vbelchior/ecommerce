import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[thFocus]'
})
export class FocusDirective implements AfterContentInit {
	public constructor(private el: ElementRef) {}

	public ngAfterContentInit() {
		this.el.nativeElement.focus();
	}
}
