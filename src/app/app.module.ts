import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddressComponent, AlertComponent, AvatarComponent, HeaderComponent, MenuComponent, PictureComponent, SnackComponent, StripComponent, WarnComponent } from '@commons/components';
import { CodeDirective, DateDirective, EmailDirective, FocusDirective, NumberDirective, PhoneDirective, TimeDirective } from '@commons/directives';
import { MomentPipe, TrustPipe } from '@commons/pipes';
import { environment } from '@environments/environment';
import { getBrazilianPaginatorIntl } from '@translations/pt-br';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio.component';
import { RouteModule } from './route.module';

import { UserService } from '../commons/services';
//import { UserComponent } from '../app/User/user.component';

registerLocaleData(localePt); // FIXME: set this dynamically

const maskConfig: Partial<IConfig> = {
	validation: false
};

@NgModule({
	imports: [
		RouteModule,
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		HttpClientModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatTooltipModule,
		MatPaginatorModule,
		MatRadioModule,
		MatSortModule,
		MatSelectModule,
		MatSidenavModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatToolbarModule,
		NgxMaskModule.forRoot(maskConfig),
		ReactiveFormsModule,
		ServiceWorkerModule.register('ngsw-config.js', {
			enabled: environment.production
		})
	],
	exports: [MatFormFieldModule, MatInputModule],
	declarations: [
		AppComponent,
		InicioComponent,
		CodeDirective,
		DateDirective,
		EmailDirective,
		FocusDirective,
		NumberDirective,
		PhoneDirective,
		TimeDirective,
		AddressComponent,
		AvatarComponent,
		AlertComponent,
		HeaderComponent,
		MenuComponent,
		PictureComponent,
		SnackComponent,
		StripComponent,
		WarnComponent,
		MomentPipe,
		TrustPipe
	],
	entryComponents: [SnackComponent],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'pt' // TODO: useClass
		},
		{
			provide: MatPaginatorIntl,
			useValue: getBrazilianPaginatorIntl()
		},
		UserService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
