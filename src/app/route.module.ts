import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { LoginComponent } from './User/login.component';
import { RegisterComponent } from './User/register.component';
import { RegisterResolver } from './User/register.resolver';
import { RegistersComponent } from './User/registers.component';
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
		component: RegistersComponent
	},
	{
		path: 'registers/:id',
		component: RegisterComponent,
		resolve: { register: RegisterResolver }
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class RouteModule {}
