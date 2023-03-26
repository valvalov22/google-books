import { Items } from './../types/items';
import { runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import { Book } from '../types/items';
import axios from 'axios';


class Store {
    books: Book[] = [];
	key = process.env.GOOGLE_BOOKS_API_KEY;
	value = "";
	loader = false;
	amount = 0;
	type = "all";
	sortBy = "relevance";
	startIndex = 0;
	idBook = "";

    constructor() {
        makeAutoObservable(this);
    }

    findBooks = () => {
		this.startIndex = 0;
		this.loader = true;
		if (this.value !== '') {
				axios
				.get<Items>(
					`https://www.googleapis.com/books/v1/volumes?q=${this.value}+${this.type === 'all' ? '' : `subject:${this.type}`}&orderBy=${this.sortBy}&maxResults=20&startIndex=${this.startIndex}&key=${this.key}`
				)
				
				.then((result) => {
					runInAction(() => {
						this.amount = result.data.totalItems;
						this.books = result.data.items;
					});
				})
				.finally(() => {
					setTimeout(() => {
						runInAction(() => {
							this.loader = false;
						});
					}, 1000);
				});
		};
	}
	changeInputValue(text: string) {
		this.value = text;
	}
	changeType(text: string) {
		this.type = text;
		this.books = [];
		if (this.value !== '') {
			this.findBooks();
		}
	}
	changeSort(text: string) {
		this.sortBy = text;
		this.books = [];
		if (this.value !== '') {
			this.findBooks();
		}
	}
	setId(id: string) {
		this.idBook = id;
	}
	findMoreBooks = () => {
		this.startIndex = this.startIndex + 30;
		runInAction(() => {
			this.loader = true;
			axios
				.get<Items>(
					`https://www.googleapis.com/books/v1/volumes?q=${this.value}+subject:${this.type === 'all' ? '' : `${this.type}`}&orderBy=${this.sortBy}&maxResults=30&startIndex=${this.startIndex}&key=${this.key}`
				)
				.then((result) => {
					runInAction(() => {
						// this.amount = result.data.totalItems;
						this.books = this.books.concat(result.data.items);
					});
				})
				.finally(() => {
					setTimeout(() => {
						runInAction(() => {
							this.loader = false;
						});
					}, 1000);
				});
		});
	};
}

export const store =  new Store();