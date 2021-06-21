import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonModel, RegisterModel } from '../models';
import { TypeUtil } from '../utils';
import { environment } from 'src/environments/environment';

interface CountInterface {
	count: number;
}

@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	constructor(private httpClient: HttpClient) {}

	private static readonly NULL_ID: string = 'Entity id is null or undefined.';

	public create(register: RegisterModel): Observable<RegisterModel> {
		const path: string = `${environment.server}/registers`;
		const json: string = JSON.stringify({ register });
		return this.httpClient.post<RegisterModel>(path, register).pipe(catchError((error) => throwError(error)));
	}

	public retrieve(register: RegisterModel): Observable<RegisterModel> {
		if (!TypeUtil.exists(register.id)) return of(new RegisterModel());
		const path: string = `${environment.server}/registers/${register.id}`;
		return this.httpClient.get<RegisterModel>(path).pipe(catchError((error) => throwError(error)));
	}

	public replace(current: RegisterModel, replacement: RegisterModel, cascade?: boolean): Observable<Object> {
		if (!TypeUtil.exists(current.id)) return throwError(new Error(RegisterService.NULL_ID));
		const path: string = `${environment.server}/registers/${current.id}`;
		const json: string = JSON.stringify({ replacement });
		let query: HttpParams = new HttpParams();
		if (TypeUtil.exists(cascade)) query.append('cascade', String(cascade));
		return this.httpClient.put(path, replacement, { params: query }).pipe(catchError((error) => throwError(error)));
	}

	public update(current: RegisterModel, replacement: RegisterModel, cascade?: boolean): Observable<Object> {
		if (!TypeUtil.exists(current.id)) return throwError(new Error(RegisterService.NULL_ID));
		const path: string = `${environment.server}/registers/${current.id}`;
		const json: string = JSON.stringify({ replacement });
		let query: HttpParams = new HttpParams();
		if (TypeUtil.exists(cascade)) query.append('cascade', String(cascade));
		return this.httpClient.patch(path, replacement, { params: query }).pipe(catchError((error) => throwError(error)));
	}

	public delete(register: RegisterModel): Observable<Object> {
		const path: string = `${environment.server}/registers/${register.id}`;
		return this.httpClient.delete(path).pipe(catchError((error) => throwError(error)));
	}

	public filter(personId?: number, date?: Date, dateEnd?: Date, status?: number, risk?: number, priority?: number, isOnline?: boolean, offset?: number, limit?: number): Observable<RegisterModel[]> {
		const path: string = `${environment.server}/registers`;
		let query: HttpParams = new HttpParams();
		if (TypeUtil.exists(personId)) query = query.append('personId', personId);
		if (TypeUtil.exists(status)) query = query.append('status', status);
		if (TypeUtil.exists(risk)) query = query.append('risk', risk);

		if (TypeUtil.exists(priority)) query = query.append('priority', priority);
		if (TypeUtil.exists(isOnline)) query = query.append('isOnline', isOnline);
		if (TypeUtil.exists(offset)) query = query.append('offset', offset);
		if (TypeUtil.exists(limit)) query = query.append('limit', limit);

		return this.httpClient.get<RegisterModel[]>(path, { params: query }).pipe(catchError((error) => throwError(error)));
	}

	public count(): Observable<number> {
		let query: HttpParams = new HttpParams();

		const path: string = `${environment.server}/registers/count`;
		const subject = new BehaviorSubject<number>(-1); // no count yet
		this.httpClient
			.get<number>(path, { params: query })
			.pipe(catchError((error) => throwError(error)))
			.subscribe((response: number) => {
				subject.next(response);
			});
		return subject.asObservable();
	}
}
