import { Component, OnInit, Output } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditBookModalComponent } from '../edit-book-modal/edit-book-modal.component';
import { MatDialog } from '@angular/material';
import { keyOfBook } from '../shared/keyofbook.service';
import { Book } from '../shared/book.model';
 
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  name: string;
  book: string;
  books: Observable<Book[]>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  Book: Observable<any>;

  constructor(public db: AngularFireDatabase, public dialog: MatDialog, public keyOfBook: keyOfBook) {
    this.books = db.list<Book>('books').valueChanges();
    this.itemsRef = db.list('books');
    // Use snapshotChanges().map() to store the key
    this.books = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.Book = db.list<Book>('books').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }))
      ));
    console.log(this.Book);
    
   }

  ngOnInit() {
  }

  onGetKey(key: string){
    this.keyOfBook.getIdOfBook(key);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditBookModalComponent, {
      minWidth: '450px',
      data: { name: this.name, color: this.book }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.book = res;
    });
    }

  onDeleteBook(key: string){
      this.db.list('books').remove(key);
  }

}