import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';


const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'list', component : ListComponent},
  {path: 'images', component: ImagesComponent, children: [
     {path: 'upload', component: ImageComponent}
  ]},
  {path: 'imageList', component: ImageListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
