import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageDetailList: AngularFireList<any>;

  constructor(private afb: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.afb.list("imageDetails");
  }

  insertImageDetails(imageDetais) {
    this.imageDetailList.push(imageDetais);
    console.log(this.imageDetailList);
  }
}
