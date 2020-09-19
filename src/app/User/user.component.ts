import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '@commons/models';
import { UserService } from '@commons/services';
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
	constructor(private userService: UserService) {}

	ngOnInit() {
		let user = new UserModel();
		user.name = 'Gabriel Aldo';
		user.phone = '319999999';
		user.email = '@';
		user.password = 'secret';
		user.cpf = '00100100100';
		user.cep = '35000000';
		user.state = 'X';
		user.city = 'Disney';
		user.neighborhood = 'Centro';
		user.street = 'Rua Y';
		user.number = '19';
		user.complement = 'Perto';
		console.log(user);
		this.userService
			.create(user)
			.toPromise()
			.then((result) => {
				console.log(result);
			})
			.catch((error: Error) => {
				console.log('erro');
			});
	}

	public ngAfterViewInit() {}
}
