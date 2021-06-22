import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TypeUtil } from '@commons/utils';
import { Observable, of, Subject } from 'rxjs';
import { RegisterModel } from '@commons/models';
import { RegisterService } from '@commons/services';

@Injectable({ providedIn: 'root' })
export class RegisterResolver implements Resolve<RegisterModel> {
	constructor(private registerService: RegisterService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RegisterModel> {
		const idPath: string = route.paramMap.get('id');
		if (idPath == 'new') return of(new RegisterModel());

		const subject: Subject<RegisterModel> = new Subject<RegisterModel>();
		this.registerService
			.retrieve(idPath)
			.toPromise()
			.then((transaction: RegisterModel) => {
				subject.next(transaction);
			})
			.catch(() => {
				subject.next(new RegisterModel());
			})
			.finally(() => subject.complete());
		return subject.asObservable();
	}
}
