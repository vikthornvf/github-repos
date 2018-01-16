import 'hammerjs';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import {
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatTabsModule,
	MatListModule,
	MatTooltipModule,
	MatSnackBarModule,
	MatProgressSpinnerModule
} from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ServiceWorkerModule } from '@angular/service-worker';
import { RepositoriesService } from './services/repositories.service';
import { FavoritesService } from './services/favorites.service';
import { CacheInterceptor } from './services/cache.interceptor';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabContentComponent } from './components/tabs/tab-content.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		TabsComponent,
		TabContentComponent,
		FavoritesComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		HttpClientModule,
		AngularFireModule.initializeApp(environment.firebase, 'github-repos'),
    AngularFireDatabaseModule,
		AppRoutingModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatListModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		InfiniteScrollModule,
		environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
	],
	providers: [
		RepositoriesService,
		FavoritesService,
		{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
