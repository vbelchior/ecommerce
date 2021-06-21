import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonModel } from '@commons/models';
import { PersonService } from '@commons/services';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, startWith, map } from 'rxjs/operators';
//import { UsuarioDatasource } from './usuarios.datasource';
import { FormControl } from '@angular/forms';
//import { SessionHandler } from '../session.handler';

@Component({
	selector: 'vf-users',
	template: `Usuários`,
	styles: [``]
})
export class UsersComponent implements OnInit, AfterViewInit {
	constructor(private userService: PersonService) {
		console.debug(localStorage.getItem('personLogin'));
	}

	ngOnInit() {}

	public ngAfterViewInit() {}
}
