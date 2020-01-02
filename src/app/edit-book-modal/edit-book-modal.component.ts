import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from '../shared/book.model';
import { BooksConnectService } from '../serverConnection/booksConnect.service';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
import { keyOfBook } from '../shared/keyofbook.service';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.scss']
})
export class EditBookModalComponent implements OnInit {

  books: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  book: AngularFireObject<Book>;
  key: string;
  path: string;
  constructor(
    public dialogRef: MatDialogRef<EditBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book, private bookDBConnect: BooksConnectService,
    public db: AngularFireDatabase, private keyOfBook: keyOfBook) 
  {
    this.itemsRef = db.list('books');
    // Use snapshotChanges().map() to store the key
    this.books = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.key = this.keyOfBook.key;
    this.book = db.object(this.key);
    console.log(this.key);
   }
 
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  onUpdateBook(key: string, author: string, title: string, description: string){
      this.itemsRef.update(key, { author: this.data.author, title: this.data.title, description: this.data.description });
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

  

