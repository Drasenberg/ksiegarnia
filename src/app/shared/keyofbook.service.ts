import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class keyOfBook{
    key: string;
    getIdOfBook(keyofbook: string){
        return this.key = keyofbook;
      }
}