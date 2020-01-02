import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../shared/book.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BooksConnectService{
    constructor(private http: HttpClient){
    

    }
    createAndStorePost(title: string, author: string, description: string){
        const postData: Book = {title: title, author: author, description: description};
        this.http
        .post<{name: string}>(
          'https://ksiegarnia-76725.firebaseio.com/books.json',
          postData
        )
        .subscribe(responseData => {
          console.log(responseData);
          console.log('https://ksiegarnia-76725.firebaseio.com/books.json' + name);
        });
    }

}