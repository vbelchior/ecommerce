import { Observable, throwError } from 'rxjs';

export abstract class IndexedDbStorage {
	private static FACTORY: IDBFactory;

	private static readonly NAME: string = 'linksaude';

	private static readonly VERSION: number = 10;

	private static readonly PRIMARY_KEY: string = 'pk';

	private static readonly READ_WRITE: IDBTransactionMode = 'readwrite';

	private static readonly READ_ONLY: IDBTransactionMode = 'readonly';

	constructor() {
		IndexedDbStorage.FACTORY = window.indexedDB || (<any>window).webkitIndexedDB || (<any>window).mozIndexedDB || (<any>window).msIndexedDB;
	}

	private open(): Observable<any> {
		return Observable.create((observer: any) => {
			let request: IDBRequest = IndexedDbStorage.FACTORY.open(IndexedDbStorage.NAME, IndexedDbStorage.VERSION);
			request.onsuccess = () => {
				observer.next(request.result);
				observer.complete();
			};
			request.onerror = () => {
				return throwError(request.error);
			};
		});
	}

	private static validate(database: IDBDatabase, collection: string): void {
		if (!database) {
			throwError('Database does not exists');
		} else if (!database.objectStoreNames.contains(collection)) {
			throwError(collection + ' does not exists');
		}
	}

	public count(collection: string, value: any, index?: string): Observable<number> {
		return Observable.create((observer: any) => {
			this.open().subscribe((database: IDBDatabase) => {
				IndexedDbStorage.validate(database, collection);
				let transaction: IDBTransaction = database.transaction(collection, IndexedDbStorage.READ_ONLY);
				let store: IDBObjectStore = transaction.objectStore(collection);
				let request: IDBRequest;
				if (index) {
					request = store.index(index).count(value);
				} else {
					request = store.count(value);
				}
				request.onsuccess = (event: any) => {
					observer.next(event.target.result);
					database.close();
					observer.complete();
				};

				database.onerror = (error: any) => {
					database.close();
					return throwError(error);
				};
			});
		});
	}

	public create(collection: string, key?: string, indexes?: string[]): Observable<any> {
		return Observable.create((observer: any) => {
			let request = IndexedDbStorage.FACTORY.open(IndexedDbStorage.NAME, IndexedDbStorage.VERSION);
			request.onupgradeneeded = (event: Event) => {
				let store: IDBObjectStore;
				if (key) {
					store = request.result.createObjectStore(collection, { keyPath: key });
				} else {
					store = request.result.createObjectStore(collection, { keyPath: IndexedDbStorage.PRIMARY_KEY, autoIncrement: true });
				}
				if (indexes) {
					for (let i = 0; i < indexes.length; i++) {
						store.createIndex(indexes[i], indexes[i], { unique: false });
					}
				}
			};
			request.onsuccess = (event: Event) => {
				observer.next(event);
				observer.complete();
			};
			request.onerror = (event: Event) => {
				return throwError('Error: ' + (<any>event.target).errorCode);
			};
		});
	}

	protected delete(collection: string, value: any): Observable<any> {
		return Observable.create((observer: any) => {
			this.open().subscribe((database: IDBDatabase) => {
				IndexedDbStorage.validate(database, collection);
				let transaction: IDBTransaction = database.transaction(collection, IndexedDbStorage.READ_WRITE);
				let store: IDBObjectStore = transaction.objectStore(collection);
				let request: IDBRequest = store.delete(value);

				request.onsuccess = (event: any) => {
					observer.next(event.target.result);
					database.close();
					observer.complete();
				};

				database.onerror = (error: any) => {
					database.close();
					return throwError(error);
				};
			});
		});
	}

	public filter(collection: string, range?: IDBKeyRange, index?: string, reverse?: boolean): Observable<any> {
		return Observable.create((observer: any) => {
			this.open().subscribe((database: IDBDatabase) => {
				IndexedDbStorage.validate(database, collection);
				let transaction: IDBTransaction = database.transaction(collection, IndexedDbStorage.READ_ONLY);
				let store: IDBObjectStore = transaction.objectStore(collection);
				let request: IDBRequest;
				if (index) {
					let order: IDBCursorDirection = reverse ? 'prev' : 'next';
					request = store.index(index).openCursor(range, order);
				} else {
					request = store.openCursor(range);
				}
				let results: Array<any> = new Array<any>();
				request.onsuccess = (event: Event) => {
					let result: IDBDatabase = (<IDBOpenDBRequest>event.target).result;
					if (result) {
						results.push(result); // FIXME: verify result type
						// cursor.continue();
					} else {
						observer.next(results);
						database.close();
						observer.complete();
					}
				};
				database.onerror = (error: any) => {
					database.close();
					return throwError(error);
				};
			});
		});
	}

	public insert(collection: string, object: any, index?: string): Observable<any> {
		return Observable.create((observer: any) => {
			this.open().subscribe((database: IDBDatabase) => {
				IndexedDbStorage.validate(database, collection);
				let transaction: IDBTransaction = database.transaction(collection, IndexedDbStorage.READ_WRITE);
				let store: IDBObjectStore = transaction.objectStore(collection);
				let request = store.add(object, index);
				request.onsuccess = (event: any) => {
					observer.next(event.target.result);
					database.close();
					observer.complete();
				};
				database.onerror = (error: any) => {
					database.close();
					return throwError(error);
				};
			});
		});
	}

	public select(collection: string, value: any, index?: string): Observable<any> {
		return Observable.create((observer: any) => {
			this.open().subscribe((database: IDBDatabase) => {
				IndexedDbStorage.validate(database, collection);
				let transaction: IDBTransaction = database.transaction(collection, IndexedDbStorage.READ_ONLY);
				let store: IDBObjectStore = transaction.objectStore(collection);
				let request: IDBRequest;
				if (index) {
					request = store.index(index).get(value);
				} else {
					request = store.get(value);
				}
				request.onsuccess = (event: Event) => {
					observer.next((<IDBOpenDBRequest>event.target).result);
					database.close();
					observer.complete();
				};
				database.onerror = (error: any) => {
					database.close();
					return throwError(error);
				};
			});
		});
	}

	public truncate(collection: string): Observable<any> {
		return Observable.create((observer: any) => {
			this.open().subscribe((database: IDBDatabase) => {
				IndexedDbStorage.validate(database, collection);
				let transaction: IDBTransaction = database.transaction(collection, IndexedDbStorage.READ_WRITE);
				let store: IDBObjectStore = transaction.objectStore(collection);
				let request: IDBRequest = store.clear();
				request.onsuccess = (event: Event) => {
					observer.next((<IDBOpenDBRequest>event.target).result);
					database.close();
					observer.complete();
				};
				database.onerror = (error: any) => {
					database.close();
					return throwError(error);
				};
			});
		});
	}

	public update(collection: string, object: any, value?: any): Observable<any> {
		return Observable.create((observer: any) => {
			this.open().subscribe((database: IDBDatabase) => {
				IndexedDbStorage.validate(database, collection);
				let transaction: IDBTransaction = database.transaction(collection, IndexedDbStorage.READ_WRITE);
				let store: IDBObjectStore = transaction.objectStore(collection);
				let request: IDBRequest = store.put(object, value);
				request.onsuccess = (event: Event) => {
					observer.next((<IDBOpenDBRequest>event.target).result);
					database.close();
					observer.complete();
				};
				database.onerror = (error: any) => {
					database.close();
					return throwError(error);
				};
			});
		});
	}
}
