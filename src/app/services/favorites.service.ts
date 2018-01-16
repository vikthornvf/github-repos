import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Repository } from '../models/repository.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class FavoritesService {

	readonly basePath: string = '/favorites';
	favoritesRef: Observable<AngularFireAction<DatabaseSnapshot>[]>;
  favorites: Observable<Repository[]>;

	constructor(private db: AngularFireDatabase) {
		this.favoritesRef = db.list(this.basePath).snapshotChanges();
	}

	list() {
		this.favorites = this.favoritesRef.map(actions => {
      return actions.map(a => {
        const data = a.payload.val() as Repository;
        const id = a.payload.val().id;
        return { id, ...data };
      });
		});
		return this.favorites;
	}

	add(repo: Repository) {
		this.db.list(this.basePath).push(repo);
	}

	remove() {
		this.db.list(this.basePath).remove();
	}

}
