import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { SignupComponent } from './User/signup.component';
import { UsersComponent } from './User/user.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'inicio',
		pathMatch: 'full'
	},
	{
		path: 'inicio',
		component: InicioComponent
	},
	{
		path: 'user',
		component: UsersComponent
	},
	{ path: 'signup', component: SignupComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class RouteModule {}
