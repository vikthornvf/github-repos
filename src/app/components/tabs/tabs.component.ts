import { Component, OnInit, HostListener } from '@angular/core';
import { Language } from '../../models/language.model';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {

	languages: string[] = [];
	selectedIndex: number = 0;

	ngOnInit(): void {
		this.languages = [
			'JavaScript',
			'TypeScript',
			'Java'
		];
	}

}
