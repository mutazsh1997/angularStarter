import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {

  imageURL: string;
  selectedImage: any;
  isSubmited: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageURL: new FormControl('', Validators.required)
  });
  constructor(private storage: AngularFireStorage, private imageList: ImageService) { }

  ngOnInit() {
    this.resutForm();
  }
  showPreview(event: any) {
    let file = event.target.files[0];
    if (event.target.files && file) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.imageURL = e.target.result };
      reader.readAsDataURL(file);
      this.selectedImage = file;
    } else {
      this.imageURL = 'http://via.placeholder.com/300';
      this.selectedImage = null;
    }
  }
  onSubmit(formTemplate) {
    this.isSubmited = true;
    if (this.formTemplate.valid) {
      var folderPath = `images/${formTemplate.category}/${this.selectedImage.name}_${new Date().getTime()}`;
      var fileRef = this.storage.ref(folderPath);
      this.storage.upload(folderPath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formTemplate['imageURL'] = url;
            this.imageList.insertImageDetails(formTemplate);
          });
        })
      ).subscribe();
      this.resutForm();
    }
  }
  get formController() {
    return this.formTemplate['controls']
  }
  resutForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      category: 'Animal',
      imageURL: ''
    });
    this.imageURL = 'http://via.placeholder.com/300';
    this.isSubmited = false;
    this.selectedImage = null;
  }
}
