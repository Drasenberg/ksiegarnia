import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalPopoutComponent } from '../modal-popout/modal-popout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
  }

  name: string;
  book: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPopoutComponent, {
      minWidth: '450px',
      data: { name: this.name, color: this.book }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.book = res;
    });
  }
}
