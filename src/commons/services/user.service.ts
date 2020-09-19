import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from '../models';
import { TypeUtil } from '../utils';
import { environment } from 'src/environments/environment';

interface CountInterface {
    count: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    private static readonly NULL_ID: string = 'Entity id is null or undefined.';

    public create(user: UserModel): Observable<UserModel> {
        if (user.issues().length > 0) return throwError(new Error(user.issues().join(', ')));
        const path: string = `${environment.server}/users`;
        const json: string = JSON.stringify({ user });
        return this.httpClient.post<UserModel>(path, user).pipe(catchError((error) => throwError(error)));
    }

    public retrieve(user: UserModel): Observable<UserModel> {
        if (!TypeUtil.exists(user.id)) return of(new UserModel());
        const path: string = `${environment.server}/users/${user.id}`;
        return this.httpClient.get<UserModel>(path).pipe(catchError((error) => throwError(error)));
    }

    public replace(current: UserModel, replacement: UserModel, cascade?: boolean): Observable<Object> {
        if (!TypeUtil.exists(current.id)) return throwError(new Error(UserService.NULL_ID));
        if (replacement.issues().length > 0) return throwError(new Error(replacement.issues().join(', ')));
        const path: string = `${environment.server}/users/${current.id}`;
        const json: string = JSON.stringify({ replacement });
        let query: HttpParams = new HttpParams();
        if (TypeUtil.exists(cascade)) query.append('cascade', String(cascade));
        return this.httpClient.put(path, replacement, { params: query }).pipe(catchError((error) => throwError(error)));
    }

    public update(current: UserModel, replacement: UserModel, cascade?: boolean): Observable<Object> {
        if (!TypeUtil.exists(current.id)) return throwError(new Error(UserService.NULL_ID));
        if (replacement.issues().length > 0) return throwError(new Error(replacement.issues().join(', ')));
        const path: string = `${environment.server}/users/${current.id}`;
        const json: string = JSON.stringify({ replacement });
        let query: HttpParams = new HttpParams();
        if (TypeUtil.exists(cascade)) query.append('cascade', String(cascade));
        return this.httpClient.patch(path, replacement, { params: query }).pipe(catchError((error) => throwError(error)));
    }

    public delete(user: UserModel): Observable<Object> {
        const path: string = `${environment.server}/users/${user.id}`;
        return this.httpClient.delete(path).pipe(catchError((error) => throwError(error)));
    }

    /*public filter(
    
        zona?: number
    ): Observable<UserModel[]> {
        const path: string = `${environment.server}/escolas`;
        let query: HttpParams = new HttpParams();
        if (TypeUtil.isFullString(municipio, true)) query = query.append('municipioParte', municipio);
        if (TypeUtil.exists(zona)) query = query.append('idZona', String(zona));
        return this.httpClient
            .get<UserModel[]>(path, { params: query })
            .pipe(catchError((error) => throwError(error)));
    }*/

    public count(): Observable<number> {
        let query: HttpParams = new HttpParams();

        const path: string = `${environment.server}/users/count`;
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