import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { RepositoriesService } from '../../services/repositories.service';
import { FavoritesService } from '../../services/favorites.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-tab-content',
	templateUrl: '/tab-content.component.html'
})
export class TabContentComponent implements OnInit {

	@Input() language: string;
	repositories: Repository[];
	selectedRepo: number;
	page: number = 1;
	err: any;

	constructor(
		private snackBar: MatSnackBar,
		private repoService: RepositoriesService,
		private favService: FavoritesService) { }

	ngOnInit(): void {
		this.loadRepositories();
	}

	loadRepositories(): void {
		this.repoService.search(this.language, this.page)
			.subscribe(
				repositories => {
					if (this.repositories) {
						this.repositories = this.repositories.concat(repositories);
					}
					else {
						this.repositories = repositories;
					}
					this.page++;
				},
				err => this.handleError(err));
	}

	handleError(err: any): void {
		console.log(err);
		this.err = err;
	}

	cleanError(): void {
		this.err = null;
		this.loadRepositories();
	}

	select(repoId: number): void {
		this.selectedRepo = repoId;
	}

	onScroll(): void {
		this.loadRepositories();
	}

	onFavorite(repo: Repository) {
		const added = !repo.favorite;
		this.openSnackBar(added);
		repo.favorite = added;
		if (added) {
			this.favService.add(repo);
			return;
		}
		// this.favService.remove(repo);
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
