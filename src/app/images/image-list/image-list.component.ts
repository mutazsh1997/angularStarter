import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: ['./style.css']
})
export class ImageListComponent implements OnInit {

  imageList: any[];
 
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.imageDetailList.snapshotChanges().subscribe(list => {
      this.imageList = list.map(item => { return item.payload.val(); });
       console.log(this.imageList);

    });
  }
  addToCart(item) {
    console.log(item);
  }
}
