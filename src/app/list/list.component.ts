import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  brews: object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.mybeer().subscribe(data => {
      let datae = this.brews = data;
      console.log(datae);
    });
  }

}
