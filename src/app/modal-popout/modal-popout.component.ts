import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from '../shared/book.model';
import { BooksConnectService } from '../serverConnection/booksConnect.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-modal-popout',
  templateUrl: './modal-popout.component.html',
  styleUrls: ['./modal-popout.component.scss']
})
export class ModalPopoutComponent implements OnInit {
  itemsRef: AngularFireList<any>
  constructor(
    public dialogRef: MatDialogRef<ModalPopoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book, private bookDBConnect: BooksConnectService, public db: AngularFireDatabase) 
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onAddBook(){
    // this.bookDBConnect.createAndStorePost(this.data.title, this.data.author, this.data.description);
    // this.itemsRef = this.db('books').
    this.dialogRef.close();
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
