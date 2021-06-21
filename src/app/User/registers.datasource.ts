import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { TypeUtil } from '@commons/utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RegisterModel } from '@commons/models';
import { RegisterService } from '@commons/services';

export class RegistersDataSource implements DataSource<RegisterModel> {
	private _registers: BehaviorSubject<RegisterModel[]>;

	private _count: BehaviorSubject<number>;

	private _empty: BehaviorSubject<boolean>;

	public count$: Observable<number>;

	public empty$: Observable<boolean>;

	constructor(private registerService: RegisterService, private initialRegisters: Array<RegisterModel>) {
		this._registers = new BehaviorSubject<RegisterModel[]>(initialRegisters);
		this._count = new BehaviorSubject<number>(initialRegisters.length);
		this._empty = new BehaviorSubject<boolean>(initialRegisters.length == 0);
		this.count$ = this._count.asObservable();
		this.empty$ = this._empty.asObservable();
	}

	public async fetchRegisters(personId?: number, date?: Date, dateEnd?: Date, status?: number, risk?: number, priority?: number, isOnline?: boolean, offset?: number, limit?: number): Promise<void> {
		return this.registerService
			.filter(personId, date, dateEnd, status, risk, priority, isOnline, offset, limit)
			.toPromise()
			.then((registers: RegisterModel[]) => {
				this._registers.next(registers);
				this._count.next(registers.length);
				this._empty.next(registers.length == 0);
				return Promise.resolve();
			})
			.catch(() => {
				this._registers.next([]);
				this._count.next(0);
				this._empty.next(true);
				return Promise.reject();
			});
	}

	public connect(collectionViewer: CollectionViewer): Observable<RegisterModel[]> {
		return this._registers.asObservable();
	}

	public disconnect(collectionViewer: CollectionViewer): void {
		this._registers.complete();
		this._count.complete();
		this._empty.complete();
	}
}
