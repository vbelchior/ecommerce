import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonModel } from '../models';
import { TypeUtil } from '../utils';
import { environment } from 'src/environments/environment';

interface CountInterface {
	count: number;
}

@Injectable({
	providedIn: 'root'
})
export class PersonService {
	constructor(private httpClient: HttpClient) {}

	private static readonly NULL_ID: string = 'Entity id is null or undefined.';

	public create(person: PersonModel): Observable<PersonModel> {
		const path: string = `${environment.server}/persons`;
		const json: string = JSON.stringify({ person });
		return this.httpClient.post<PersonModel>(path, person).pipe(catchError((error) => throwError(error)));
	}

	public retrieve(person: PersonModel): Observable<PersonModel> {
		if (!TypeUtil.exists(person.id)) return of(new PersonModel());
		const path: string = `${environment.server}/persons/${person.id}`;
		return this.httpClient.get<PersonModel>(path).pipe(catchError((error) => throwError(error)));
	}

	public replace(current: PersonModel, replacement: PersonModel, cascade?: boolean): Observable<Object> {
		if (!TypeUtil.exists(current.id)) return throwError(new Error(PersonService.NULL_ID));
		const path: string = `${environment.server}/persons/${current.id}`;
		const json: string = JSON.stringify({ replacement });
		let query: HttpParams = new HttpParams();
		if (TypeUtil.exists(cascade)) query.append('cascade', String(cascade));
		return this.httpClient.put(path, replacement, { params: query }).pipe(catchError((error) => throwError(error)));
	}

	public update(current: PersonModel, replacement: PersonModel, cascade?: boolean): Observable<Object> {
		if (!TypeUtil.exists(current.id)) return throwError(new Error(PersonService.NULL_ID));
		const path: string = `${environment.server}/persons/${current.id}`;
		const json: string = JSON.stringify({ replacement });
		let query: HttpParams = new HttpParams();
		if (TypeUtil.exists(cascade)) query.append('cascade', String(cascade));
		return this.httpClient.patch(path, replacement, { params: query }).pipe(catchError((error) => throwError(error)));
	}

	public delete(person: PersonModel): Observable<Object> {
		const path: string = `${environment.server}/persons/${person.id}`;
		return this.httpClient.delete(path).pipe(catchError((error) => throwError(error)));
	}

	/*public filter(

        zona?: number
    ): Observable<PersonModel[]> {
        const path: string = `${environment.server}/escolas`;
        let query: HttpParams = new HttpParams();
        if (TypeUtil.isFullString(municipio, true)) query = query.append('municipioParte', municipio);
        if (TypeUtil.exists(zona)) query = query.append('idZona', String(zona));
        return this.httpClient
            .get<PersonModel[]>(path, { params: query })
            .pipe(catchError((error) => throwError(error)));
    }*/

	public count(): Observable<number> {
		let query: HttpParams = new HttpParams();

		const path: string = `${environment.server}/persons/count`;
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
