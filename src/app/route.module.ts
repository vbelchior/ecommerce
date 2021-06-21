import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { LoginComponent } from './User/login.component';
import { SignupComponent } from './User/signup.component';
import { UsersComponent } from './User/user.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },

	{
		path: 'inicio',
		component: InicioComponent
	},
	{
		path: 'registers',
		component: UsersComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class RouteModule {}
