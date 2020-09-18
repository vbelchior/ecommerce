import { Pipe, PipeTransform } from '@angular/core';
import moment, { Moment } from 'moment-timezone';
import 'moment/locale/pt-br';
import { TypeUtil } from '../utils/type.util';

@Pipe({
	name: 'thMoment'
})
export class MomentPipe implements PipeTransform {
	constructor() {}

	transform(value: Moment, format?: string): string {
		if (value === null || value === undefined) return '';
		if (moment(value).isValid()) {
			const locale: string = localStorage.userLocale;
			const result = TypeUtil.isEmptyString(locale) ? moment(value) : moment(value).locale(locale);
			return TypeUtil.isEmptyString(format) ? result.format() : result.format(format);
		} else {
			return '';
		}
	}
}
