import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs/Observable';
import { Repository } from '../../models/repository.model';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-favorites',
	templateUrl: '/favorites.component.html'
})
export class FavoritesComponent implements OnInit {

	pageSize: number = 8;
	selectedRepo: number;
	favorites: Observable<Repository[]>;

	constructor(
		private snackBar: MatSnackBar,
		private favService: FavoritesService) { }

	ngOnInit(): void {
		this.favorites = this.favService.list();
	}

	select(repoId: number): void {
		this.selectedRepo = repoId;
	}

	cleanFavoritos() {
		this.favService.remove();
	}

	openSnackBar(added: boolean) {
		const message = added
			? 'Adicionado aos favoritos'
			: 'Removido dos favoritos';
		this.snackBar.open(message, 'Fechar', {
			duration: 2000,
		});
	}

}
