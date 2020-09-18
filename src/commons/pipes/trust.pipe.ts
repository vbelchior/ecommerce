import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'thTrust'
})
export class TrustPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(value: any): any {
		if (value) {
			return this.sanitizer.bypassSecurityTrustResourceUrl(value);
		} else {
			return '';
		}
	}
}
