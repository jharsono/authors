import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors: any;
  constructor(private _httpService: HttpService){ }
  ngOnInit(){
    this.getAuthorsFromService();
    }
  getAuthorsFromService(){ // define the function to get an observable and subscribe
    let observable = this._httpService.getAllAuthors(); //getAllAuthors is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our data!", data);
        this.authors = data; //put data into products objects
      }); // subscribe
    }
    delete(id){
      let observable = this._httpService.delete(id);
      observable.subscribe( data => {
        this.getAuthorsFromService();
      });
    }
    getAuthor(id) {
      console.log(id);
      this._httpService.getAuthor(id);
    }
}
