import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsComponent } from './components/tabs/tabs.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
	{ path: '', component: TabsComponent  },
	{ path: 'favorites', component: FavoritesComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
