import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FavoritesService } from './favorites.service';
import { Observable } from 'rxjs/Observable';
import { Repository } from '../models/repository.model';

@Injectable()
export class RepositoriesService {

  readonly API_URL = 'https://api.github.com';

  constructor(
		private http: HttpClient,
		private favService: FavoritesService) { }

  search(language: string, page: number): Observable<Repository[]> {
		return this.http.get(`${this.API_URL}/search/repositories?q=language=${language}&sort=stars&order=desc&page=${page}&per_page=8`)
			.map(response => {
				const repositories = response['items'];
				let favorites: Repository[];
				this.favService.list().subscribe(favorites => {
					for (let repo of repositories) {
						if (favorites.filter(f => f.id === repo.id).length > 0) {
							repo.favorite = true;
						}
					}
				});
				return repositories;
			});
	}

}