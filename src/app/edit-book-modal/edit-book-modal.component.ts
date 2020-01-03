import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { Book } from '../shared/book.model';
import { BooksConnectService } from '../serverConnection/booksConnect.service';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
import { keyOfBook } from '../shared/keyofbook.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.scss']
})
export class EditBookModalComponent implements OnInit {

  books: Observable<any[]>;
  itemsRef: AngularFireObject<any>;
  items: Observable<any[]>;
  book: any;
  key: string;
  path: string;
  constructor(
    public dialogRef: MatDialogRef<EditBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book, private bookDBConnect: BooksConnectService,
    public db: AngularFireDatabase, private keyOfBook: keyOfBook) 
  {
    this.key = this.keyOfBook.key;
    this.itemsRef = this.getBookRef(this.key);
    this.book = this.getBookRef(this.key).valueChanges();
    console.log(data.author);
    
   }
 
   getBookRef(id: string) {
    const path = `/books/${id}`;
    return this.db.object(path);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  onUpdateBook(author: string, title: string, description: string){
    const postData: Book = {title: title, author: author, description: description};
    this.itemsRef.update(postData);
  }


  onClear(){
    const title = '';
    const author = '';
    const description = '';

    this.data.title = title;
    this.data.author = author;
    this.data.description = description;
  }
  }

  

